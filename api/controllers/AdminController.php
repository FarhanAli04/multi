<?php
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class AdminController {
    private $db;
    private $auth;
    private $productColumns;
    private $validatedProductColumns;

    public function __construct() {
        $this->db = new Database();
        $this->auth = new AuthMiddleware();
        $this->productColumns = null;
        $this->validatedProductColumns = [];
    }

    private function disableProductColumn($name) {
        $this->validatedProductColumns[$name] = false;
        $cols = $this->getProductColumns();
        unset($cols[$name]);
        $this->productColumns = $cols;
    }

    private function runWithIsActiveFallback(callable $fn) {
        try {
            return $fn();
        } catch (PDOException $e) {
            if ($e->getCode() === '42S22' && stripos($e->getMessage(), 'is_active') !== false) {
                $this->disableProductColumn('is_active');
                return $fn();
            }
            throw $e;
        }
    }

    private function getProductColumns() {
        if (is_array($this->productColumns)) {
            return $this->productColumns;
        }

        try {
            $stmt = $this->db->prepare("SHOW COLUMNS FROM products");
            $stmt->execute();
            $cols = [];
            foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
                if (isset($row['Field'])) {
                    $cols[$row['Field']] = true;
                }
            }
            $this->productColumns = $cols;
            return $this->productColumns;
        } catch (Exception $e) {
            $this->productColumns = [];
            return $this->productColumns;
        }
    }

    private function hasProductColumn($name) {
        $cols = $this->getProductColumns();
        if (!isset($cols[$name])) {
            return false;
        }

        if (in_array($name, ['is_active', 'status', 'is_published'], true)) {
            return $this->probeProductColumn($name);
        }

        return true;
    }

    private function probeProductColumn($name) {
        if (array_key_exists($name, $this->validatedProductColumns)) {
            return (bool)$this->validatedProductColumns[$name];
        }

        try {
            $stmt = $this->db->prepare("SELECT 1 FROM products WHERE {$name} IS NOT NULL LIMIT 1");
            $stmt->execute();
            $this->validatedProductColumns[$name] = true;
            return true;
        } catch (PDOException $e) {
            $this->validatedProductColumns[$name] = false;
            $cols = $this->getProductColumns();
            unset($cols[$name]);
            $this->productColumns = $cols;
            return false;
        }
    }

    private function activeProductCondition($alias = 'p') {
        if ($this->hasProductColumn('is_active')) {
            return "{$alias}.is_active = 1";
        }
        if ($this->hasProductColumn('status')) {
            return "{$alias}.status = 'active'";
        }
        if ($this->hasProductColumn('is_published')) {
            return "{$alias}.is_published = 1";
        }
        return "1=1";
    }

    public function updateVendorStatus() {
        $user = $this->auth->authenticate();
        if ($user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Admin access required']);
            return;
        }

        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        if (!preg_match('/\/api\/admin\/vendors\/(\d+)\/status/', $path, $m)) {
            http_response_code(400);
            echo json_encode(['error' => 'Vendor ID is required']);
            return;
        }
        $vendorId = (int)$m[1];

        $data = json_decode(file_get_contents('php://input'), true);
        if (!is_array($data)) $data = [];

        // accepted: status (Active|Pending|Suspended), is_active (bool), is_approved (bool)
        $status = $data['status'] ?? null;
        $isActive = array_key_exists('is_active', $data) ? (int)(!!$data['is_active']) : null;
        $isApproved = array_key_exists('is_approved', $data) ? (int)(!!$data['is_approved']) : null;

        if ($status) {
            if ($status === 'Active') {
                $isActive = 1;
                $isApproved = 1;
            } elseif ($status === 'Pending') {
                $isActive = 1;
                $isApproved = 0;
            } elseif ($status === 'Suspended') {
                $isActive = 0;
            }
        }

        try {
            $this->db->beginTransaction();

            if ($isActive !== null) {
                $stmt = $this->db->prepare("UPDATE users SET is_active = ?, updated_at = NOW() WHERE id = ? AND role = 'seller'");
                $stmt->execute([$isActive, $vendorId]);
            }

            if ($isApproved !== null) {
                $stmt = $this->db->prepare("UPDATE sellers SET is_approved = ? WHERE user_id = ?");
                $stmt->execute([$isApproved, $vendorId]);
            }

            $this->db->commit();
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            $this->db->rollBack();
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function getVendors() {
        // Authenticate admin
        $user = $this->auth->authenticate();
        if ($user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Admin access required']);
            return;
        }

        $search = $_GET['search'] ?? '';
        $status = $_GET['status'] ?? '';
        $limit = min($_GET['limit'] ?? 50, 100);
        $offset = $_GET['offset'] ?? 0;

        try {
            $vendors = $this->runWithIsActiveFallback(function () use ($search, $status, $limit, $offset) {
                $activeProduct = $this->activeProductCondition('p');
                $sql = "
                SELECT
                    u.id as user_id,
                    u.full_name,
                    u.email,
                    u.phone,
                    u.is_active,
                    u.created_at,
                    u.last_seen,
                    s.business_name,
                    s.store_name,
                    s.store_address,
                    s.is_approved,
                    s.commission_rate,
                    (SELECT COUNT(*) FROM products p WHERE p.seller_id = u.id AND {$activeProduct}) as products,
                    (SELECT COUNT(*) FROM orders o WHERE o.seller_id = u.id) as orders,
                    (SELECT COALESCE(SUM(o.total_amount),0) FROM orders o WHERE o.seller_id = u.id AND o.status != 'cancelled') as earnings
                FROM users u
                LEFT JOIN sellers s ON s.user_id = u.id
                WHERE u.role = 'seller'
            ";
                $params = [];

                if ($search !== '') {
                    $sql .= " AND (u.full_name LIKE ? OR u.email LIKE ? OR s.store_name LIKE ?)";
                    $q = "%{$search}%";
                    $params[] = $q;
                    $params[] = $q;
                    $params[] = $q;
                }

                if ($status !== '' && $status !== 'all') {
                    if ($status === 'Active') {
                        $sql .= " AND u.is_active = 1 AND COALESCE(s.is_approved, 0) = 1";
                    } elseif ($status === 'Pending') {
                        $sql .= " AND u.is_active = 1 AND COALESCE(s.is_approved, 0) = 0";
                    } elseif ($status === 'Suspended') {
                        $sql .= " AND u.is_active = 0";
                    }
                }

                $sql .= " ORDER BY u.created_at DESC LIMIT ? OFFSET ?";
                $params[] = (int)$limit;
                $params[] = (int)$offset;

                $stmt = $this->db->prepare($sql);
                $stmt->execute($params);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            });

            // Normalize fields for frontend
            $result = [];
            foreach ($vendors as $v) {
                $vendorStatus = 'Pending';
                if ((int)$v['is_active'] === 0) {
                    $vendorStatus = 'Suspended';
                } elseif ((int)($v['is_approved'] ?? 0) === 1) {
                    $vendorStatus = 'Active';
                }

                $result[] = [
                    'id' => (int)$v['user_id'],
                    'name' => $v['store_name'] ?: ($v['business_name'] ?: 'Seller'),
                    'owner' => $v['full_name'] ?: '',
                    'email' => $v['email'] ?: '',
                    'phone' => $v['phone'] ?: '',
                    'address' => $v['store_address'] ?: '',
                    'products' => (int)$v['products'],
                    'orders' => (int)$v['orders'],
                    'earnings' => (float)$v['earnings'],
                    'verified' => (int)($v['is_approved'] ?? 0) === 1,
                    'status' => $vendorStatus,
                    'commission' => (float)($v['commission_rate'] ?? 10.0),
                    'joinDate' => $v['created_at'],
                    'lastActive' => $v['last_seen'],
                ];
            }

            header('Content-Type: application/json');
            echo json_encode(['vendors' => $result]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function getDashboardStats() {
        // Authenticate admin
        $user = $this->auth->authenticate();
        
        if ($user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Admin access required']);
            return;
        }

        try {
            // Get dashboard stats
            $stats = [];
            
            // Total users
            $stmt = $this->db->prepare("
                SELECT 
                    COUNT(*) as total_users,
                    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_users
                FROM users
                WHERE is_active = 1
            ");
            $stmt->execute();
            $userStats = $stmt->fetch();
            $stats['total_users'] = $userStats['total_users'];
            $stats['new_users'] = $userStats['new_users'];
            
            // Total orders and revenue
            $stmt = $this->db->prepare("
                SELECT 
                    COUNT(*) as total_orders,
                    COALESCE(SUM(total_amount), 0) as total_revenue,
                    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_orders
                FROM orders
                WHERE status != 'cancelled'
            ");
            $stmt->execute();
            $orderStats = $stmt->fetch();
            $stats['total_orders'] = $orderStats['total_orders'];
            $stats['total_revenue'] = $orderStats['total_revenue'];
            $stats['new_orders'] = $orderStats['new_orders'];
            
            // Active sellers
            $stmt = $this->db->prepare("
                SELECT 
                    COUNT(*) as active_sellers,
                    COUNT(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as new_sellers
                FROM users
                WHERE role = 'seller' AND is_active = 1
            ");
            $stmt->execute();
            $sellerStats = $stmt->fetch();
            $stats['active_sellers'] = $sellerStats['active_sellers'];
            $stats['new_sellers'] = $sellerStats['new_sellers'];
            
            // Frozen accounts
            $stmt = $this->db->prepare("
                SELECT COUNT(*) as frozen_accounts
                FROM users
                WHERE is_active = 0
            ");
            $stmt->execute();
            $frozenStats = $stmt->fetch();
            $stats['frozen_accounts'] = $frozenStats['frozen_accounts'];
            
            header('Content-Type: application/json');
            echo json_encode(['stats' => $stats]);
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function getRecentOrders() {
        // Authenticate admin
        $user = $this->auth->authenticate();
        
        if ($user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Admin access required']);
            return;
        }

        $limit = min($_GET['limit'] ?? 10, 50);

        try {
            $stmt = $this->db->prepare("
                SELECT 
                    o.id,
                    o.status,
                    o.total_amount,
                    o.created_at,
                    u.full_name as customer_name,
                    u.email as customer_email,
                    s.full_name as seller_name,
                    ss.store_name
                FROM orders o
                JOIN users u ON o.customer_id = u.id
                JOIN users s ON o.seller_id = s.id
                LEFT JOIN sellers ss ON ss.user_id = s.id
                ORDER BY o.created_at DESC
                LIMIT ?
            ");
            $stmt->execute([$limit]);
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            header('Content-Type: application/json');
            echo json_encode(['orders' => $orders]);
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function getFrozenAccounts() {
        // Authenticate admin
        $user = $this->auth->authenticate();
        
        if ($user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Admin access required']);
            return;
        }

        try {
            $stmt = $this->db->prepare("
                SELECT id, full_name, email, role, created_at, last_seen
                FROM users
                WHERE is_active = 0
                ORDER BY created_at DESC
                LIMIT 20
            ");
            $stmt->execute();
            $accounts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            header('Content-Type: application/json');
            echo json_encode(['accounts' => $accounts]);
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function getUsers() {
        // Authenticate admin
        $user = $this->auth->authenticate();
        
        if ($user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Admin access required']);
            return;
        }

        $role = $_GET['role'] ?? '';
        $status = $_GET['status'] ?? '';
        $search = $_GET['search'] ?? '';
        $limit = min($_GET['limit'] ?? 20, 50);
        $offset = $_GET['offset'] ?? 0;

        try {
            $sql = "
                SELECT id, full_name, email, role, phone, is_active, created_at, last_seen
                FROM users
                WHERE 1=1
            ";
            $params = [];
            
            if (!empty($role)) {
                $sql .= " AND role = ?";
                $params[] = $role;
            }
            
            if ($status === 'active') {
                $sql .= " AND is_active = 1";
            } elseif ($status === 'inactive') {
                $sql .= " AND is_active = 0";
            }
            
            if (!empty($search)) {
                $sql .= " AND (full_name LIKE ? OR email LIKE ?)";
                $searchParam = "%{$search}%";
                $params[] = $searchParam;
                $params[] = $searchParam;
            }
            
            $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            header('Content-Type: application/json');
            echo json_encode(['users' => $users]);
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function updateUserStatus() {
        // Authenticate admin
        $user = $this->auth->authenticate();
        
        if ($user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['error' => 'Admin access required']);
            return;
        }

        $data = json_decode(file_get_contents('php://input'), true);
        $userId = $data['user_id'] ?? null;
        $isActive = $data['is_active'] ?? null;

        if (!$userId || $isActive === null) {
            http_response_code(400);
            echo json_encode(['error' => 'User ID and status are required']);
            return;
        }

        try {
            $stmt = $this->db->prepare("
                UPDATE users 
                SET is_active = ?, updated_at = NOW()
                WHERE id = ?
            ");
            $stmt->execute([$isActive, $userId]);
            
            echo json_encode([
                'success' => true,
                'message' => 'User status updated successfully'
            ]);
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $requestUri = $_SERVER['REQUEST_URI'];
        
        if ($method === 'GET') {
            if (strpos($requestUri, '/api/admin/dashboard/stats') !== false) {
                $this->getDashboardStats();
            } elseif (strpos($requestUri, '/api/admin/orders/recent') !== false) {
                $this->getRecentOrders();
            } elseif (strpos($requestUri, '/api/admin/accounts/frozen') !== false) {
                $this->getFrozenAccounts();
            } elseif (strpos($requestUri, '/api/admin/vendors') !== false) {
                $this->getVendors();
            } elseif (strpos($requestUri, '/api/admin/users') !== false) {
                $this->getUsers();
            }
        } elseif ($method === 'PUT') {
            if (strpos($requestUri, '/api/admin/vendors') !== false && strpos($requestUri, '/status') !== false) {
                $this->updateVendorStatus();
                return;
            }
            if (strpos($requestUri, '/api/admin/users/status') !== false) {
                $this->updateUserStatus();
            }
        }
    }
}
