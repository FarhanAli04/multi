<?php
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require __DIR__ . '/vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

class Chat implements MessageComponentInterface {
    protected $clients;
    protected $userConnections;
    protected $db;
    protected $hasUsersIsActive;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->userConnections = [];
        $this->hasUsersIsActive = null;
        
        // Initialize database connection
        try {
            $this->db = new PDO(
                "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_DATABASE']};charset=utf8mb4",
                $_ENV['DB_USERNAME'],
                $_ENV['DB_PASSWORD'],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    protected function usersHasIsActiveColumn() {
        if ($this->hasUsersIsActive !== null) {
            return (bool)$this->hasUsersIsActive;
        }

        try {
            $stmt = $this->db->prepare("SHOW COLUMNS FROM users LIKE 'is_active'");
            $stmt->execute();
            $this->hasUsersIsActive = (bool)$stmt->fetch(PDO::FETCH_ASSOC);
            return (bool)$this->hasUsersIsActive;
        } catch (Exception $e) {
            $this->hasUsersIsActive = false;
            return false;
        }
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection
        $this->clients->attach($conn);
        
        // Get the access token from the query string
        $queryString = $conn->httpRequest->getUri()->getQuery();
        parse_str($queryString, $queryParams);
        
        if (isset($queryParams['token'])) {
            try {
                // Validate the JWT token
                $decoded = JWT::decode($queryParams['token'], new Key($_ENV['JWT_SECRET'], 'HS256'));
                $userId = $decoded->sub;
                
                // Get user from database
                $activeWhere = $this->usersHasIsActiveColumn() ? ' AND is_active = 1' : '';
                $stmt = $this->db->prepare("SELECT id, email, full_name, role, avatar_url FROM users WHERE id = ?{$activeWhere}");
                $stmt->execute([$userId]);
                $user = $stmt->fetch();
                
                if (!$user) {
                    $conn->close(1008, 'User not found');
                    return;
                }
                
                // Store user connection
                $this->userConnections[$conn->resourceId] = [
                    'user_id' => $userId,
                    'user_data' => $user
                ];
                
                // Update user online status in database
                $this->db->prepare("UPDATE users SET is_online = 1, last_seen = NOW() WHERE id = ?")->execute([$userId]);
                
                // Notify user that they're connected
                $conn->send(json_encode([
                    'type' => 'connection_established',
                    'user_id' => $userId,
                    'user_data' => $user,
                    'message' => 'Connected to chat server'
                ]));
                
                // Notify other users that this user is online
                $this->broadcastUserStatus($userId, true);
                
                echo "New connection! ({$user['email']})\n";
            } catch (Exception $e) {
                echo "Authentication failed: " . $e->getMessage() . "\n";
                $conn->close(1008, 'Unauthorized');
            }
        } else {
            $conn->close(1008, 'No access token provided');
        }
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);
        
        if (!$data || !isset($data['type'])) {
            return;
        }
        
        $fromUserId = $this->userConnections[$from->resourceId]['user_id'] ?? null;
        
        if (!$fromUserId) {
            return;
        }
        
        try {
            switch ($data['type']) {
                case 'message':
                    $this->handleMessage($from, $fromUserId, $data);
                    break;
                    
                case 'typing':
                    $this->handleTyping($fromUserId, $data);
                    break;
                    
                case 'read_receipt':
                    $this->handleReadReceipt($fromUserId, $data);
                    break;
                    
                case 'user_status':
                    $this->handleUserStatus($fromUserId, $data);
                    break;
            }
        } catch (Exception $e) {
            echo "Error handling message: " . $e->getMessage() . "\n";
            $from->send(json_encode([
                'type' => 'error',
                'message' => $e->getMessage()
            ]));
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $userId = $this->userConnections[$conn->resourceId]['user_id'] ?? null;
        
        if ($userId) {
            // Check if user has other active connections
            $hasOtherConnections = false;
            foreach ($this->userConnections as $connId => $userConn) {
                if ($userConn['user_id'] == $userId && $connId != $conn->resourceId) {
                    $hasOtherConnections = true;
                    break;
                }
            }
            
            if (!$hasOtherConnections) {
                // Update user status to offline in database
                $this->db->prepare("UPDATE users SET is_online = 0, last_seen = NOW() WHERE id = ?")->execute([$userId]);
                
                // Notify contacts about offline status
                $this->broadcastUserStatus($userId, false);
            }
            
            unset($this->userConnections[$conn->resourceId]);
            
            echo "User {$userId} disconnected\n";
        }
        
        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
    
    protected function handleMessage(ConnectionInterface $from, $fromUserId, $data) {
        $conversationId = $data['conversation_id'] ?? null;
        $content = $data['content'] ?? '';
        
        if (!$conversationId || !$content) {
            throw new Exception('Missing conversation ID or content');
        }
        
        // Verify user is part of the conversation
        $stmt = $this->db->prepare("
            SELECT 1 FROM conversation_participants 
            WHERE conversation_id = ? AND user_id = ?
        ");
        $stmt->execute([$conversationId, $fromUserId]);
        
        if ($stmt->rowCount() === 0) {
            throw new Exception('Not authorized for this conversation');
        }
        
        // Save message to database
        $stmt = $this->db->prepare("
            INSERT INTO messages (conversation_id, sender_id, content) 
            VALUES (?, ?, ?)
        ");
        $stmt->execute([$conversationId, $fromUserId, $content]);
        $messageId = $this->db->lastInsertId();
        
        // Get message with user details
        $stmt = $this->db->prepare("
            SELECT m.*, u.full_name as sender_name, u.avatar_url as sender_avatar
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.id = ?
        ");
        $stmt->execute([$messageId]);
        $message = $stmt->fetch();
        
        // Update conversation timestamp
        $this->db->prepare("
            UPDATE conversations 
            SET updated_at = NOW() 
            WHERE id = ?
        ")->execute([$conversationId]);
        
        // Broadcast to all participants
        $this->broadcastToConversation($conversationId, $message, $fromUserId);
    }
    
    protected function handleTyping($fromUserId, $data) {
        $conversationId = $data['conversation_id'] ?? null;
        $isTyping = (bool)($data['is_typing'] ?? false);
        
        if (!$conversationId) {
            return;
        }
        
        $typingData = [
            'type' => 'typing',
            'user_id' => $fromUserId,
            'conversation_id' => $conversationId,
            'is_typing' => $isTyping
        ];
        
        $this->broadcastToConversation($conversationId, $typingData, $fromUserId);
    }
    
    protected function handleReadReceipt($fromUserId, $data) {
        $messageId = $data['message_id'] ?? null;
        
        if (!$messageId) {
            return;
        }
        
        // Mark message as read
        $stmt = $this->db->prepare("
            INSERT IGNORE INTO message_reads (message_id, user_id) 
            VALUES (?, ?)
        ");
        $stmt->execute([$messageId, $fromUserId]);
        
        // Update last read message in conversation
        $stmt = $this->db->prepare("
            UPDATE conversation_participants cp
            JOIN messages m ON m.conversation_id = cp.conversation_id
            SET cp.last_read_message_id = ?
            WHERE m.id = ? AND cp.user_id = ?
        ");
        $stmt->execute([$messageId, $messageId, $fromUserId]);
        
        // Notify sender that message was read
        $stmt = $this->db->prepare("
            SELECT m.sender_id, m.conversation_id 
            FROM messages m 
            WHERE m.id = ?
        ");
        $stmt->execute([$messageId]);
        $message = $stmt->fetch();
        
        if ($message) {
            $readData = [
                'type' => 'read_receipt',
                'message_id' => $messageId,
                'user_id' => $fromUserId,
                'conversation_id' => $message['conversation_id'],
                'read_at' => date('Y-m-d H:i:s')
            ];
            
            $this->broadcastToUser($message['sender_id'], $readData);
        }
    }
    
    protected function handleUserStatus($fromUserId, $data) {
        $isOnline = (bool)($data['is_online'] ?? false);
        
        $this->db->prepare("
            UPDATE users SET is_online = ?, last_seen = NOW() WHERE id = ?
        ")->execute([$isOnline ? 1 : 0, $fromUserId]);
        
        $this->broadcastUserStatus($fromUserId, $isOnline);
    }
    
    protected function broadcastUserStatus($userId, $isOnline) {
        $statusData = [
            'type' => 'user_status',
            'user_id' => $userId,
            'is_online' => $isOnline,
            'last_seen' => $isOnline ? null : date('Y-m-d H:i:s')
        ];
        
        // Notify all connections of this user's contacts
        $stmt = $this->db->prepare("
            SELECT DISTINCT cp2.user_id 
            FROM conversation_participants cp1
            JOIN conversation_participants cp2 ON cp1.conversation_id = cp2.conversation_id
            WHERE cp1.user_id = ? AND cp2.user_id != ?
        ");
        $stmt->execute([$userId, $userId]);
        $contacts = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        foreach ($contacts as $contactId) {
            $this->broadcastToUser($contactId, $statusData);
        }
    }
    
    protected function broadcastToConversation($conversationId, $data, $excludeUserId = null) {
        $stmt = $this->db->prepare("
            SELECT user_id FROM conversation_participants 
            WHERE conversation_id = ? AND user_id != ?
        ");
        $stmt->execute([$conversationId, $excludeUserId]);
        $participants = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        foreach ($participants as $userId) {
            $this->broadcastToUser($userId, $data);
        }
    }
    
    protected function broadcastToUser($userId, $data) {
        foreach ($this->clients as $client) {
            if (isset($this->userConnections[$client->resourceId]) && 
                $this->userConnections[$client->resourceId]['user_id'] == $userId) {
                $client->send(json_encode($data));
            }
        }
    }

// Run the WebSocket server
$port = getenv('WEBSOCKET_PORT') ?: 8080;
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    $port
);

echo "WebSocket server running on port {$port}\n";
$server->run();
