<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class ChatController {
    private $db;
    private $auth;

    public function __construct() {
        $this->db = new Database();
        $this->auth = new AuthMiddleware();
    }

    public function conversations() {
        $method = $_SERVER['REQUEST_METHOD'];
        
        if ($method === 'GET') {
            $this->getConversations();
        } elseif ($method === 'POST') {
            $this->createConversation();
        }
    }

    public function getConversations() {
        // Authenticate user
        $user = $this->auth->authenticate();
        
        try {
            $stmt = $this->db->prepare("
                SELECT 
                    c.id as conversation_id,
                    c.created_at,
                    c.updated_at,
                    u.id as other_user_id,
                    u.full_name as other_user_name,
                    u.email as other_user_email,
                    u.avatar_url as other_user_avatar,
                    u.is_online as other_user_online,
                    u.last_seen as other_user_last_seen,
                    m.content as last_message,
                    m.created_at as last_message_at,
                    m.sender_id as last_message_sender_id,
                    (SELECT COUNT(*) FROM messages m2 
                     WHERE m2.conversation_id = c.id 
                     AND m2.id > cp.last_read_message_id
                     AND m2.sender_id != ?) as unread_count
                FROM conversations c
                JOIN conversation_participants cp ON c.id = cp.conversation_id
                JOIN conversation_participants cp2 ON c.id = cp2.conversation_id
                JOIN users u ON cp2.user_id = u.id
                LEFT JOIN messages m ON (
                    m.id = (
                        SELECT id FROM messages 
                        WHERE conversation_id = c.id 
                        ORDER BY created_at DESC 
                        LIMIT 1
                    )
                )
                WHERE cp.user_id = ? AND cp2.user_id != ?
                ORDER BY m.created_at DESC
            ");
            
            $stmt->execute([$user['id'], $user['id'], $user['id']]);
            $conversations = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            header('Content-Type: application/json');
            echo json_encode(['conversations' => $conversations]);
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function createConversation() {
        // Authenticate user
        $user = $this->auth->authenticate();
        
        $data = json_decode(file_get_contents('php://input'), true);
        $recipientId = $data['recipient_id'] ?? null;
        
        if (!$recipientId) {
            http_response_code(400);
            echo json_encode(['error' => 'Recipient ID is required']);
            return;
        }
        
        if ($recipientId == $user['id']) {
            http_response_code(400);
            echo json_encode(['error' => 'Cannot create conversation with yourself']);
            return;
        }
        
        try {
            $this->db->beginTransaction();
            
            // Check if recipient exists
            $stmt = $this->db->prepare("SELECT id FROM users WHERE id = ? AND is_active = 1");
            $stmt->execute([$recipientId]);
            
            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Recipient not found']);
                return;
            }
            
            // Check if conversation already exists
            $stmt = $this->db->prepare("
                SELECT c.id 
                FROM conversations c
                JOIN conversation_participants cp1 ON c.id = cp1.conversation_id
                JOIN conversation_participants cp2 ON c.id = cp2.conversation_id
                WHERE cp1.user_id = ? AND cp2.user_id = ?
            ");
            
            $stmt->execute([$user['id'], $recipientId]);
            $existing = $stmt->fetch();
            
            if ($existing) {
                echo json_encode(['conversation_id' => $existing['id']]);
                return;
            }
            
            // Create new conversation
            $this->db->exec("INSERT INTO conversations () VALUES ()");
            $conversationId = $this->db->lastInsertId();
            
            // Add participants
            $stmt = $this->db->prepare("
                INSERT INTO conversation_participants (conversation_id, user_id) 
                VALUES (?, ?), (?, ?)
            ");
            $stmt->execute([$conversationId, $user['id'], $conversationId, $recipientId]);
            
            $this->db->commit();
            
            http_response_code(201);
            echo json_encode([
                'conversation_id' => $conversationId,
                'message' => 'Conversation created successfully'
            ]);
            
        } catch (Exception $e) {
            $this->db->rollBack();
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function getConversation() {
        // Authenticate user
        $user = $this->auth->authenticate();
        
        $conversationId = $this->getIdFromUrl();
        
        if (!$conversationId) {
            http_response_code(400);
            echo json_encode(['error' => 'Conversation ID is required']);
            return;
        }
        
        // Verify user is part of the conversation
        $stmt = $this->db->prepare("
            SELECT 1 FROM conversation_participants 
            WHERE conversation_id = ? AND user_id = ?
        ");
        $stmt->execute([$conversationId, $user['id']]);
        
        if ($stmt->rowCount() === 0) {
            http_response_code(403);
            echo json_encode(['error' => 'Not authorized to view this conversation']);
            return;
        }
        
        // Get conversation details with participants
        $stmt = $this->db->prepare("
            SELECT 
                c.id as conversation_id,
                c.created_at,
                c.updated_at,
                u.id as user_id,
                u.full_name,
                u.email,
                u.avatar_url,
                u.is_online,
                u.last_seen
            FROM conversations c
            JOIN conversation_participants cp ON c.id = cp.conversation_id
            JOIN users u ON cp.user_id = u.id
            WHERE c.id = ? AND u.id != ?
        ");
        
        $stmt->execute([$conversationId, $user['id']]);
        $otherUser = $stmt->fetch();
        
        if (!$otherUser) {
            http_response_code(404);
            echo json_encode(['error' => 'Conversation not found']);
            return;
        }
        
        echo json_encode([
            'conversation_id' => $conversationId,
            'other_user' => $otherUser
        ]);
    }

    public function getMessages() {
        // Authenticate user
        $user = $this->auth->authenticate();
        
        $conversationId = $this->getIdFromUrl();
        
        if (!$conversationId) {
            http_response_code(400);
            echo json_encode(['error' => 'Conversation ID is required']);
            return;
        }
        
        // Verify user is part of the conversation
        $stmt = $this->db->prepare("
            SELECT 1 FROM conversation_participants 
            WHERE conversation_id = ? AND user_id = ?
        ");
        $stmt->execute([$conversationId, $user['id']]);
        
        if ($stmt->rowCount() === 0) {
            http_response_code(403);
            echo json_encode(['error' => 'Not authorized to view this conversation']);
            return;
        }
        
        // Get messages
        $stmt = $this->db->prepare("
            SELECT 
                m.*, 
                u.full_name as sender_name, 
                u.avatar_url as sender_avatar,
                (SELECT COUNT(*) > 0 FROM message_reads mr 
                 WHERE mr.message_id = m.id AND mr.user_id = ?) as is_read
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.conversation_id = ?
            ORDER BY m.created_at ASC
        ");
        $stmt->execute([$user['id'], $conversationId]);
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Mark messages as read
        $stmt = $this->db->prepare("
            UPDATE conversation_participants 
            SET last_read_message_id = (
                SELECT MAX(id) FROM messages 
                WHERE conversation_id = ?
            )
            WHERE conversation_id = ? AND user_id = ?
        ");
        $stmt->execute([$conversationId, $conversationId, $user['id']]);
        
        header('Content-Type: application/json');
        echo json_encode(['messages' => $messages]);
    }

    public function sendMessage() {
        // Authenticate user
        $user = $this->auth->authenticate();
        
        $data = json_decode(file_get_contents('php://input'), true);
        $conversationId = $data['conversation_id'] ?? null;
        $content = $data['content'] ?? '';
        $messageType = $data['message_type'] ?? 'text';
        
        if (!$conversationId || !$content) {
            http_response_code(400);
            echo json_encode(['error' => 'Conversation ID and content are required']);
            return;
        }
        
        try {
            // Verify user is part of the conversation
            $stmt = $this->db->prepare("
                SELECT 1 FROM conversation_participants 
                WHERE conversation_id = ? AND user_id = ?
            ");
            $stmt->execute([$conversationId, $user['id']]);
            
            if ($stmt->rowCount() === 0) {
                http_response_code(403);
                echo json_encode(['error' => 'Not authorized for this conversation']);
                return;
            }
            
            // Save message
            $stmt = $this->db->prepare("
                INSERT INTO messages (conversation_id, sender_id, content, message_type)
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([$conversationId, $user['id'], $content, $messageType]);
            $messageId = $this->db->lastInsertId();
            
            // Get the full message with user details
            $stmt = $this->db->prepare("
                SELECT m.*, u.full_name as sender_name, u.avatar_url as sender_avatar
                FROM messages m
                JOIN users u ON m.sender_id = u.id
                WHERE m.id = ?
            ");
            $stmt->execute([$messageId]);
            $message = $stmt->fetch();
            
            // Update conversation updated_at
            $this->db->prepare("
                UPDATE conversations 
                SET updated_at = NOW() 
                WHERE id = ?
            ")->execute([$conversationId]);
            
            // Get other participants
            $stmt = $this->db->prepare("
                SELECT user_id 
                FROM conversation_participants 
                WHERE conversation_id = ? AND user_id != ?
            ");
            $stmt->execute([$conversationId, $user['id']]);
            $participants = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            http_response_code(201);
            header('Content-Type: application/json');
            echo json_encode([
                'message' => $message,
                'participants' => $participants
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function markAsRead() {
        // Authenticate user
        $user = $this->auth->authenticate();
        
        $messageId = $this->getIdFromUrl();
        
        if (!$messageId) {
            http_response_code(400);
            echo json_encode(['error' => 'Message ID is required']);
            return;
        }
        
        try {
            // Verify message exists and user is in the conversation
            $stmt = $this->db->prepare("
                SELECT m.conversation_id, m.sender_id
                FROM messages m
                JOIN conversation_participants cp ON m.conversation_id = cp.conversation_id
                WHERE m.id = ? AND cp.user_id = ?
            ");
            $stmt->execute([$messageId, $user['id']]);
            
            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Message not found or not authorized']);
                return;
            }
            
            $message = $stmt->fetch();
            
            // Mark message as read
            $stmt = $this->db->prepare("
                INSERT IGNORE INTO message_reads (message_id, user_id) 
                VALUES (?, ?)
            ");
            $stmt->execute([$messageId, $user['id']]);
            
            // Update last read message in conversation
            $stmt = $this->db->prepare("
                UPDATE conversation_participants 
                SET last_read_message_id = ?
                WHERE conversation_id = ? AND user_id = ?
            ");
            $stmt->execute([$messageId, $message['conversation_id'], $user['id']]);
            
            echo json_encode([
                'message' => 'Message marked as read',
                'message_id' => $messageId,
                'sender_id' => $message['sender_id']
            ]);
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    private function getIdFromUrl() {
        $requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        if (!$requestPath) return null;

        if (preg_match_all('/(\d+)/', $requestPath, $matches) && !empty($matches[1])) {
            $id = end($matches[1]);
            return (int)$id;
        }

        return null;
    }

    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        // Parse the request to determine which method to call
        if (strpos($requestUri, '/api/conversations') !== false) {
            if (preg_match('/\/api\/conversations\/(\d+)\/messages/', $requestUri, $matches)) {
                $this->getMessages();
            } elseif (preg_match('/\/api\/conversations\/(\d+)/', $requestUri, $matches)) {
                $this->getConversation();
            } else {
                $this->conversations();
            }
        } elseif (strpos($requestUri, '/api/messages') !== false) {
            if (preg_match('/\/api\/messages\/(\d+)\/read/', $requestUri, $matches)) {
                $this->markAsRead();
            } else {
                $this->sendMessage();
            }
        }
    }
}
