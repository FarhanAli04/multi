<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class UserController {
    private $db;
    private $auth;

    public function __construct() {
        $this->db = new Database();
        $this->auth = new AuthMiddleware();
    }

    public function getUsers() {
        // Authenticate user
        $user = $this->auth->authenticate();
        
        $search = $_GET['search'] ?? '';
        $role = $_GET['role'] ?? null;
        $limit = min($_GET['limit'] ?? 20, 50);
        $offset = $_GET['offset'] ?? 0;
        
        try {
            $sql = "
                SELECT 
                    id, 
                    full_name, 
                    email, 
                    role, 
                    avatar_url,
                    is_online,
                    last_seen
                FROM users 
                WHERE is_active = 1 AND id != ?
            ";
            $params = [$user['id']];
            
            if (!empty($search)) {
                $sql .= " AND (full_name LIKE ? OR email LIKE ?)";
                $searchParam = "%{$search}%";
                $params[] = $searchParam;
                $params[] = $searchParam;
            }
            
            if ($role && in_array($role, ['admin', 'seller', 'customer'])) {
                $sql .= " AND role = ?";
                $params[] = $role;
            }
            
            $sql .= " ORDER BY is_online DESC, full_name ASC LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Remove sensitive info
            foreach ($users as &$u) {
                unset($u['password_hash']);
            }
            
            header('Content-Type: application/json');
            echo json_encode(['users' => $users]);
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function handleRequest() {
        $this->getUsers();
    }
}
