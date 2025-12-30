<?php
// Set CORS headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load environment variables (create a .env file in the api directory)
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value, "'\"");
            putenv("$key=$value");
            $_ENV[$key] = $value;
            $_SERVER[$key] = $value;
        }
    }
}

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

set_exception_handler(function ($e) {
    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: application/json');
    }
    echo json_encode([
        'success' => false,
        'error' => 'Server error',
        'message' => $e->getMessage(),
    ]);
    exit;
});

set_error_handler(function ($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) {
        return false;
    }

    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: application/json');
    }

    echo json_encode([
        'success' => false,
        'error' => 'Server error',
        'message' => $message,
        'file' => $file,
        'line' => $line,
    ]);
    exit;
});

register_shutdown_function(function () {
    $err = error_get_last();
    if (!$err) {
        return;
    }

    $fatalTypes = [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR];
    if (!in_array($err['type'] ?? 0, $fatalTypes, true)) {
        return;
    }

    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: application/json');
    }

    echo json_encode([
        'success' => false,
        'error' => 'Server error',
        'message' => $err['message'] ?? 'Fatal error',
        'file' => $err['file'] ?? null,
        'line' => $err['line'] ?? null,
    ]);
});

// Define base path
define('BASE_PATH', __DIR__);

// Get the request URI and method
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Normalize when hosted under a subdirectory (e.g. /myapp/api/auth/login)
$apiPos = strpos($requestUri, '/api/');
if ($apiPos !== false) {
    $requestUri = substr($requestUri, $apiPos);
}

// Health check endpoint (useful for verifying Apache rewrite / routing)
if ($requestUri === '/api/health') {
    echo json_encode(['success' => true, 'message' => 'API is running']);
    exit;
}

// Route the request
$routes = [
    '/api/auth/register' => ['controller' => 'AuthController', 'method' => 'register', 'http_method' => 'POST', 'endpoint' => 'register'],
    '/api/auth/login' => ['controller' => 'AuthController', 'method' => 'login', 'http_method' => 'POST', 'endpoint' => 'login'],
    '/api/auth/profile' => ['controller' => 'AuthController', 'method' => 'profile', 'http_method' => ['GET', 'PUT'], 'endpoint' => 'profile'],
    '/api/auth/me' => ['controller' => 'AuthController', 'method' => 'me', 'http_method' => 'GET', 'endpoint' => 'me'],
    
    // Chat endpoints
    '/api/conversations' => ['controller' => 'ChatController', 'method' => 'conversations', 'http_method' => ['GET', 'POST']],
    '/api/conversations/{id}' => ['controller' => 'ChatController', 'method' => 'getConversation', 'http_method' => ['GET', 'DELETE']],
    '/api/conversations/{id}/messages' => ['controller' => 'ChatController', 'method' => 'getMessages', 'http_method' => 'GET'],
    '/api/messages' => ['controller' => 'ChatController', 'method' => 'sendMessage', 'http_method' => 'POST'],
    '/api/messages/{id}' => ['controller' => 'ChatController', 'method' => 'sendMessage', 'http_method' => 'DELETE'],
    '/api/messages/{id}/read' => ['controller' => 'ChatController', 'method' => 'markAsRead', 'http_method' => 'POST'],
    
    // Product endpoints
    '/api/products' => ['controller' => 'ProductController', 'method' => 'getProducts', 'http_method' => 'GET'],
    '/api/products/{id}' => ['controller' => 'ProductController', 'method' => 'getProduct', 'http_method' => 'GET'],
    '/api/categories' => ['controller' => 'ProductController', 'method' => 'getCategories', 'http_method' => 'GET'],

    // Seller product management
    '/api/seller/products' => ['controller' => 'ProductController', 'method' => 'handleRequest', 'http_method' => ['GET', 'POST']],
    '/api/seller/products/{id}' => ['controller' => 'ProductController', 'method' => 'handleRequest', 'http_method' => ['PUT', 'DELETE']],
    
    // Order endpoints
    '/api/orders' => ['controller' => 'OrderController', 'method' => 'getCustomerOrders', 'http_method' => ['GET', 'POST']],
    '/api/orders/stats' => ['controller' => 'OrderController', 'method' => 'getOrderStats', 'http_method' => 'GET'],

    // Cart endpoints
    '/api/cart' => ['controller' => 'CartController', 'method' => 'handleRequest', 'http_method' => ['GET', 'POST', 'DELETE']],
    '/api/cart/{id}' => ['controller' => 'CartController', 'method' => 'handleRequest', 'http_method' => ['PUT', 'DELETE']],

    // Seller order management
    '/api/seller/orders' => ['controller' => 'OrderController', 'method' => 'handleRequest', 'http_method' => 'GET'],
    '/api/seller/orders/{id}/status' => ['controller' => 'OrderController', 'method' => 'handleRequest', 'http_method' => 'PUT'],

    // Seller withdrawals
    '/api/seller/wallet' => ['controller' => 'WithdrawalController', 'method' => 'handleRequest', 'http_method' => 'GET'],
    '/api/seller/withdrawals' => ['controller' => 'WithdrawalController', 'method' => 'handleRequest', 'http_method' => ['GET', 'POST']],

    // Admin product/order/category/vendor management
    '/api/admin/products' => ['controller' => 'ProductController', 'method' => 'handleRequest', 'http_method' => ['GET', 'POST']],
    '/api/admin/products/{id}' => ['controller' => 'ProductController', 'method' => 'handleRequest', 'http_method' => ['PUT', 'DELETE']],
    '/api/admin/categories' => ['controller' => 'ProductController', 'method' => 'handleRequest', 'http_method' => ['GET', 'POST']],
    '/api/admin/categories/{id}' => ['controller' => 'ProductController', 'method' => 'handleRequest', 'http_method' => ['PUT', 'DELETE']],
    '/api/admin/orders' => ['controller' => 'OrderController', 'method' => 'handleRequest', 'http_method' => 'GET'],
    '/api/admin/orders/{id}/status' => ['controller' => 'OrderController', 'method' => 'handleRequest', 'http_method' => 'PUT'],
    '/api/admin/vendors' => ['controller' => 'AdminController', 'method' => 'handleRequest', 'http_method' => 'GET'],
    '/api/admin/vendors/{id}/status' => ['controller' => 'AdminController', 'method' => 'handleRequest', 'http_method' => 'PUT'],

    // Admin withdrawal management
    '/api/admin/withdrawals' => ['controller' => 'WithdrawalController', 'method' => 'handleRequest', 'http_method' => 'GET'],
    '/api/admin/withdrawals/{id}/decision' => ['controller' => 'WithdrawalController', 'method' => 'handleRequest', 'http_method' => 'PUT'],
    
    // Admin endpoints
    '/api/admin/dashboard/stats' => ['controller' => 'AdminController', 'method' => 'getDashboardStats', 'http_method' => 'GET'],
    '/api/admin/orders/recent' => ['controller' => 'AdminController', 'method' => 'getRecentOrders', 'http_method' => 'GET'],
    '/api/admin/accounts/frozen' => ['controller' => 'AdminController', 'method' => 'getFrozenAccounts', 'http_method' => 'GET'],
    '/api/admin/users' => ['controller' => 'AdminController', 'method' => 'getUsers', 'http_method' => 'GET'],
    '/api/admin/users/status' => ['controller' => 'AdminController', 'method' => 'updateUserStatus', 'http_method' => 'PUT'],

    // Admin promo code management (seller store creation incentive)
    '/api/admin/promo-codes' => ['controller' => 'PromoCodeController', 'method' => 'handleRequest', 'http_method' => ['GET', 'POST']],
    '/api/admin/promo-codes/{id}' => ['controller' => 'PromoCodeController', 'method' => 'handleRequest', 'http_method' => ['PUT', 'DELETE']],
    
    // Users endpoint for finding users to chat with
    '/api/users' => ['controller' => 'UserController', 'method' => 'getUsers', 'http_method' => 'GET'],
    
    // Settings endpoints
    '/api/settings' => ['controller' => 'SettingsController', 'method' => 'getSettings', 'http_method' => 'GET'],
    '/api/settings/update' => ['controller' => 'SettingsController', 'method' => 'updateSettings', 'http_method' => 'POST'],
];

// Find matching route
$matchedRoute = null;
foreach ($routes as $route => $config) {
    $httpMethods = (array) $config['http_method'];
    if (!in_array($requestMethod, $httpMethods)) {
        continue;
    }

    // Support placeholders like /api/products/{id}
    if (strpos($route, '{') !== false) {
        $pattern = preg_replace('/\{[^\/]+\}/', '(\\d+)', $route);
        $regex = '#^' . $pattern . '$#';
        if (preg_match($regex, $requestUri)) {
            $matchedRoute = $config;
            break;
        }
    } else {
        if ($requestUri === $route) {
            $matchedRoute = $config;
            break;
        }
    }
}

// Handle 404 if no route matched
if (!$matchedRoute) {
    header('HTTP/1.1 404 Not Found');
    echo json_encode(['error' => 'Endpoint not found']);
    exit;
}

// Include the controller file
$controllerFile = __DIR__ . '/controllers/' . $matchedRoute['controller'] . '.php';
if (!file_exists($controllerFile)) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Internal server error']);
    exit;
}

require_once $controllerFile;

// Create controller instance and call the method
$controllerName = $matchedRoute['controller'];
$methodName = $matchedRoute['method'];

$controller = new $controllerName();

// For this example, we'll just handle auth routes directly
if ($controllerName === 'AuthController') {
    if (!isset($_GET['endpoint']) || $_GET['endpoint'] === '') {
        if (isset($matchedRoute['endpoint'])) {
            $_GET['endpoint'] = $matchedRoute['endpoint'];
        }
    }
    $controller->handleRequest();
    exit;
}

// For most controllers, delegate URL parsing to their handleRequest() when present.
if (method_exists($controller, 'handleRequest')) {
    $controller->handleRequest();
    exit;
}

// Call the method if it exists
if (method_exists($controller, $methodName)) {
    $controller->$methodName();
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Method not implemented']);
}
