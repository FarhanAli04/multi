<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

class AuthController {
    private $userModel;
    private $auth;

    public function __construct() {
        $this->userModel = new User();
        $this->auth = new AuthMiddleware();
        
        // Enable CORS
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        
        // Handle preflight requests
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }

    // Handle incoming requests
    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';
        
        try {
            switch ($endpoint) {
                case 'register':
                    if ($method === 'POST') {
                        $this->register();
                    } else {
                        $this->methodNotAllowed();
                    }
                    break;
                    
                case 'login':
                    if ($method === 'POST') {
                        $this->login();
                    } else {
                        $this->methodNotAllowed();
                    }
                    break;
                    
                case 'profile':
                    $user = $this->auth->authenticate(); // Requires authentication
                    
                    if ($method === 'GET') {
                        $this->getProfile($user);
                    } elseif ($method === 'PUT') {
                        $this->updateProfile($user);
                    } else {
                        $this->methodNotAllowed();
                    }
                    break;
                    
                case 'me':
                    if ($method === 'GET') {
                        $this->me();
                    } else {
                        $this->methodNotAllowed();
                    }
                    break;
                    
                default:
                    $this->notFound();
                    break;
            }
        } catch (Exception $e) {
            $this->sendError($e->getMessage());
        }
    }

    // Register a new user
    private function register() {
        $data = $this->getRequestData();
        
        // Validate required fields
        $requiredFields = ['email', 'password', 'role', 'full_name'];
        $this->validateFields($data, $requiredFields);
        
        // Additional validation for seller registration
        if ($data['role'] === 'seller') {
            $requiredSellerFields = ['business_name', 'store_name', 'cnic_number'];
            $this->validateFields($data, $requiredSellerFields);
            
            // Extract seller data
            $sellerData = [
                'business_name' => $data['business_name'],
                'store_name' => $data['store_name'],
                'cnic_number' => $data['cnic_number'],
                'tax_number' => $data['tax_number'] ?? null,
                'store_address' => $data['store_address'] ?? null,
                'bank_name' => $data['bank_name'] ?? null,
                'account_number' => $data['account_number'] ?? null,
                'account_holder_name' => $data['account_holder_name'] ?? null,
                'cnic_document_url' => $data['cnic_document_url'] ?? null
            ];
            
            $data['seller_data'] = $sellerData;
        }
        
        // Create user
        $userId = $this->userModel->register($data);
        
        // Get the created user
        $user = $this->userModel->getUserWithRoleData($userId);
        
        // Generate JWT token
        $token = AuthMiddleware::generateToken($userId, $data['role']);
        
        // Return success response
        $this->sendResponse([
            'success' => true,
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token
        ]);
    }

    // User login
    private function login() {
        $data = $this->getRequestData();
        
        // Validate required fields
        $this->validateFields($data, ['email', 'password']);
        
        // Authenticate user
        $user = $this->userModel->authenticate($data['email'], $data['password']);
        
        if (!$user) {
            throw new Exception('Invalid email or password');
        }
        
        // Generate JWT token
        $token = AuthMiddleware::generateToken($user['id'], $user['role']);
        
        // Get full user data with role-specific information
        $userData = $this->userModel->getUserWithRoleData($user['id']);
        
        // Return success response
        $this->sendResponse([
            'success' => true,
            'message' => 'Login successful',
            'user' => $userData,
            'token' => $token
        ]);
    }

    // Get user profile
    private function getProfile($user) {
        // User is already authenticated and passed from the middleware
        $this->sendResponse([
            'success' => true,
            'user' => $user
        ]);
    }

    // Update user profile
    private function updateProfile($user) {
        $data = $this->getRequestData();
        
        // Update the user profile
        $this->userModel->updateProfile($user['id'], $data);
        
        // Get updated user data
        $updatedUser = $this->userModel->getUserWithRoleData($user['id']);
        
        $this->sendResponse([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => $updatedUser
        ]);
    }

    // Get current user info (for JWT validation)
    public function me() {
        $user = $this->auth->authenticate();
        $userData = $this->userModel->getUserWithRoleData($user['id']);
        
        $this->sendResponse([
            'success' => true,
            'user' => $userData
        ]);
    }

    // Get JSON input from request
    private function getRequestData() {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? ($_SERVER['HTTP_CONTENT_TYPE'] ?? '');

        // Prefer JSON when declared.
        if (stripos((string)$contentType, 'application/json') !== false) {
            $raw = file_get_contents('php://input');
            $raw = is_string($raw) ? trim($raw) : '';

            // Strip UTF-8 BOM if present.
            if (strncmp($raw, "\xEF\xBB\xBF", 3) === 0) {
                $raw = substr($raw, 3);
                $raw = trim($raw);
            }

            // Windows curl/Powershell users often wrap JSON in single quotes; accept it.
            if (strlen($raw) >= 2 && $raw[0] === "'" && substr($raw, -1) === "'") {
                $raw = substr($raw, 1, -1);
                $raw = trim($raw);
            }

            if ($raw === '') {
                return [];
            }

            $data = json_decode($raw, true);
            if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
                // Some Windows shells send JSON with literal backslashes (e.g. {\"email\":...}).
                // Try to unescape and decode again.
                $raw2 = str_replace('\\"', '"', $raw);
                $raw2 = str_replace('\\\'', "'", $raw2);
                $raw2 = str_replace('\\\\', '\\', $raw2);
                $data2 = json_decode($raw2, true);
                if (json_last_error() !== JSON_ERROR_NONE || !is_array($data2)) {
                    throw new Exception('Invalid JSON data');
                }
                $data = $data2;
            }

            return $data;
        }

        // Fallback: handle form submissions.
        if (!empty($_POST) && is_array($_POST)) {
            return $_POST;
        }

        $raw = file_get_contents('php://input');
        $raw = is_string($raw) ? trim($raw) : '';
        if ($raw === '') {
            return [];
        }

        $data = [];
        parse_str($raw, $data);
        return is_array($data) ? $data : [];
    }

    // Validate required fields
    private function validateFields($data, $requiredFields) {
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                throw new Exception("$field is required");
            }
        }
    }

    // Send JSON response
    private function sendResponse($data, $statusCode = 200) {
        http_response_code($statusCode);
        echo json_encode($data);
        exit;
    }

    // Send error response
    private function sendError($message, $statusCode = 400) {
        $this->sendResponse([
            'success' => false,
            'error' => $message
        ], $statusCode);
    }

    // 404 Not Found
    private function notFound() {
        $this->sendError('Endpoint not found', 404);
    }

    // 405 Method Not Allowed
    private function methodNotAllowed() {
        $this->sendError('Method not allowed', 405);
    }
}

?>
