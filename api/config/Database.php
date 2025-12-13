<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $conn;

    private function ensureSchema(PDO $conn) {
        try {
            $ensureTable = function (string $table, string $createSql) use ($conn) {
                $stmt = $conn->prepare("SHOW TABLES LIKE ?");
                $stmt->execute([$table]);
                if (!$stmt->fetch(PDO::FETCH_NUM)) {
                    $conn->exec($createSql);
                }
            };

            $ensureTable('users', "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, password_hash VARCHAR(255) NOT NULL, role VARCHAR(20) NOT NULL, full_name VARCHAR(255) NULL, phone VARCHAR(20) NULL, avatar_url VARCHAR(255) DEFAULT NULL, is_online TINYINT(1) NOT NULL DEFAULT 0, last_seen TIMESTAMP NULL, is_active TINYINT(1) NOT NULL DEFAULT 1, email_verified_at TIMESTAMP NULL, created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB");
            $ensureTable('sellers', "CREATE TABLE IF NOT EXISTS sellers (user_id INT PRIMARY KEY, business_name VARCHAR(255) NOT NULL, store_name VARCHAR(255) NOT NULL UNIQUE, cnic_number VARCHAR(20) NULL UNIQUE, cnic_document_url VARCHAR(255) DEFAULT NULL, tax_number VARCHAR(50) DEFAULT NULL, store_address TEXT NULL, bank_name VARCHAR(100) DEFAULT NULL, account_number VARCHAR(50) DEFAULT NULL, account_holder_name VARCHAR(255) DEFAULT NULL, is_approved TINYINT(1) NOT NULL DEFAULT 0, commission_rate DECIMAL(5,2) NOT NULL DEFAULT 10.00) ENGINE=InnoDB");
            $ensureTable('categories', "CREATE TABLE IF NOT EXISTS categories (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT NULL, image_url VARCHAR(255) DEFAULT NULL, is_active TINYINT(1) NOT NULL DEFAULT 1, created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB");
            $ensureTable('products', "CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, seller_id INT NULL, category_id INT NULL, name VARCHAR(255) NOT NULL, description TEXT NULL, price DECIMAL(10,2) NOT NULL DEFAULT 0.00, stock INT NOT NULL DEFAULT 0, image_url VARCHAR(255) DEFAULT NULL, is_active TINYINT(1) NOT NULL DEFAULT 1, created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB");
            $ensureTable('orders', "CREATE TABLE IF NOT EXISTS orders (id INT AUTO_INCREMENT PRIMARY KEY, order_number VARCHAR(50) NULL, customer_id INT NULL, seller_id INT NULL, status VARCHAR(30) DEFAULT 'pending', subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00, tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00, shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00, discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00, total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00, payment_status VARCHAR(30) DEFAULT 'pending', payment_method VARCHAR(50) DEFAULT NULL, shipping_address TEXT NULL, billing_address TEXT NULL, notes TEXT NULL, created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB");
            $ensureTable('order_items', "CREATE TABLE IF NOT EXISTS order_items (id INT AUTO_INCREMENT PRIMARY KEY, order_id INT NOT NULL, product_id INT NOT NULL, quantity INT NOT NULL DEFAULT 1, price DECIMAL(10,2) NOT NULL DEFAULT 0.00, total DECIMAL(10,2) NOT NULL DEFAULT 0.00, created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB");
            $ensureTable('cart', "CREATE TABLE IF NOT EXISTS cart (user_id INT NOT NULL, product_id INT NOT NULL, quantity INT NOT NULL DEFAULT 1, created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_id, product_id)) ENGINE=InnoDB");
            $ensureTable('reviews', "CREATE TABLE IF NOT EXISTS reviews (id INT AUTO_INCREMENT PRIMARY KEY, product_id INT NOT NULL, user_id INT NOT NULL, rating TINYINT NOT NULL, comment TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, INDEX idx_reviews_product_id (product_id), INDEX idx_reviews_user_id (user_id)) ENGINE=InnoDB");

            $ensureColumn = function (string $table, string $column, string $definition) use ($conn) {
                try {
                    $stmt = $conn->prepare("SHOW COLUMNS FROM {$table} LIKE ?");
                    $stmt->execute([$column]);
                    if (!$stmt->fetch(PDO::FETCH_ASSOC)) {
                        $conn->exec("ALTER TABLE {$table} ADD COLUMN {$definition}");
                    }
                } catch (Exception $e) {
                }
            };

            $ensureColumn('users', 'email', 'email VARCHAR(255) NULL');
            $ensureColumn('users', 'password_hash', 'password_hash VARCHAR(255) NULL');
            $ensureColumn('users', 'role', 'role VARCHAR(20) NULL');
            $ensureColumn('users', 'full_name', 'full_name VARCHAR(255) NULL');
            $ensureColumn('users', 'phone', 'phone VARCHAR(20) NULL');
            $ensureColumn('users', 'avatar_url', 'avatar_url VARCHAR(255) DEFAULT NULL');
            $ensureColumn('users', 'is_active', 'is_active TINYINT(1) NOT NULL DEFAULT 1');
            $ensureColumn('users', 'created_at', 'created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP');
            $ensureColumn('users', 'updated_at', 'updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP');

            $ensureColumn('users', 'last_seen', 'last_seen TIMESTAMP NULL');

            $ensureColumn('products', 'category_id', 'category_id INT NULL');
            $ensureColumn('products', 'seller_id', 'seller_id INT NULL');
            $ensureColumn('products', 'name', 'name VARCHAR(255) NULL');
            $ensureColumn('products', 'description', 'description TEXT');
            $ensureColumn('products', 'price', 'price DECIMAL(10,2) NOT NULL DEFAULT 0.00');
            $ensureColumn('products', 'stock', 'stock INT NOT NULL DEFAULT 0');
            $ensureColumn('products', 'is_active', 'is_active TINYINT(1) NOT NULL DEFAULT 1');
            $ensureColumn('products', 'image_url', 'image_url VARCHAR(255) DEFAULT NULL');
            $ensureColumn('products', 'created_at', 'created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP');
            $ensureColumn('products', 'updated_at', 'updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP');

            $stmt = $conn->prepare("SHOW COLUMNS FROM products LIKE 'vendor_id'");
            $stmt->execute();
            $hasVendorId = (bool)$stmt->fetch(PDO::FETCH_ASSOC);
            if ($hasVendorId) {
                $conn->exec("UPDATE products SET seller_id = vendor_id WHERE seller_id IS NULL AND vendor_id IS NOT NULL");
            }

            $stmt = $conn->prepare("SHOW COLUMNS FROM products LIKE 'user_id'");
            $stmt->execute();
            $hasUserId = (bool)$stmt->fetch(PDO::FETCH_ASSOC);
            if ($hasUserId) {
                $conn->exec("UPDATE products SET seller_id = user_id WHERE seller_id IS NULL AND user_id IS NOT NULL");
            }

            $stmt = $conn->prepare("SHOW COLUMNS FROM products LIKE 'quantity'");
            $stmt->execute();
            $hasQuantity = (bool)$stmt->fetch(PDO::FETCH_ASSOC);
            if ($hasQuantity) {
                $conn->exec("UPDATE products SET stock = quantity WHERE stock = 0 AND quantity IS NOT NULL");
            }

            $stmt = $conn->prepare("SHOW COLUMNS FROM products LIKE 'status'");
            $stmt->execute();
            $hasStatus = (bool)$stmt->fetch(PDO::FETCH_ASSOC);
            if ($hasStatus) {
                $conn->exec("UPDATE products SET is_active = CASE WHEN status = 'inactive' THEN 0 ELSE 1 END WHERE is_active NOT IN (0,1) OR is_active IS NULL");
            }

            $stmt = $conn->prepare("SHOW TABLES LIKE 'reviews'");
            $stmt->execute();
            if (!$stmt->fetch(PDO::FETCH_NUM)) {
                $conn->exec("CREATE TABLE IF NOT EXISTS reviews (id INT AUTO_INCREMENT PRIMARY KEY, product_id INT NOT NULL, user_id INT NOT NULL, rating TINYINT NOT NULL, comment TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, INDEX idx_reviews_product_id (product_id), INDEX idx_reviews_user_id (user_id)) ENGINE=InnoDB");
            }

            $ensureColumn('categories', 'description', 'description TEXT');
            $ensureColumn('categories', 'image_url', 'image_url VARCHAR(255) DEFAULT NULL');
            $ensureColumn('categories', 'is_active', 'is_active TINYINT(1) NOT NULL DEFAULT 1');
            $ensureColumn('categories', 'created_at', 'created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP');
            $ensureColumn('categories', 'updated_at', 'updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP');

            $stmt = $conn->prepare("SHOW COLUMNS FROM categories LIKE 'status'");
            $stmt->execute();
            $hasCategoryStatus = (bool)$stmt->fetch(PDO::FETCH_ASSOC);
            if ($hasCategoryStatus) {
                $conn->exec("UPDATE categories SET is_active = CASE WHEN status = 'inactive' THEN 0 ELSE 1 END WHERE is_active NOT IN (0,1) OR is_active IS NULL");
            }

            $ensureColumn('sellers', 'user_id', 'user_id INT NULL');
            $ensureColumn('sellers', 'business_name', 'business_name VARCHAR(255) NULL');
            $ensureColumn('sellers', 'store_name', 'store_name VARCHAR(255) NULL');
            $ensureColumn('sellers', 'cnic_number', 'cnic_number VARCHAR(20) NULL');
            $ensureColumn('sellers', 'is_approved', 'is_approved TINYINT(1) NOT NULL DEFAULT 0');
            $ensureColumn('sellers', 'commission_rate', 'commission_rate DECIMAL(5,2) NOT NULL DEFAULT 10.00');
            $ensureColumn('sellers', 'store_address', 'store_address TEXT');

            $ensureTable('wishlist', "CREATE TABLE IF NOT EXISTS wishlist (user_id INT NOT NULL, product_id INT NOT NULL, created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_id, product_id)) ENGINE=InnoDB");
            $ensureTable('wallets', "CREATE TABLE IF NOT EXISTS wallets (user_id INT PRIMARY KEY, balance DECIMAL(10,2) NOT NULL DEFAULT 0.00, updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB");

            $stmt = $conn->prepare("SHOW COLUMNS FROM users LIKE 'password'");
            $stmt->execute();
            $hasLegacyPassword = (bool)$stmt->fetch(PDO::FETCH_ASSOC);
            if ($hasLegacyPassword) {
                $conn->exec("UPDATE users SET password_hash = password WHERE (password_hash IS NULL OR password_hash = '') AND password IS NOT NULL AND password != ''");
            }

            $ensureColumn('orders', 'customer_id', 'customer_id INT NULL');
            $ensureColumn('orders', 'seller_id', 'seller_id INT NULL');
            $ensureColumn('orders', 'status', 'status VARCHAR(30) DEFAULT \'pending\'');
            $ensureColumn('orders', 'total_amount', 'total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00');
            $ensureColumn('orders', 'created_at', 'created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP');
            $ensureColumn('orders', 'updated_at', 'updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP');

            $ensureColumn('order_items', 'order_id', 'order_id INT NULL');
            $ensureColumn('order_items', 'product_id', 'product_id INT NULL');
            $ensureColumn('order_items', 'quantity', 'quantity INT NOT NULL DEFAULT 1');
            $ensureColumn('order_items', 'price', 'price DECIMAL(10,2) NOT NULL DEFAULT 0.00');
            $ensureColumn('order_items', 'created_at', 'created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP');
        } catch (Exception $e) {
        }
    }

    public function __construct() {
        $this->host = $_ENV['DB_HOST'] ?? 'localhost';
        $this->db_name = $_ENV['DB_DATABASE'] ?? 'multi_vendor_system';
        $this->username = $_ENV['DB_USERNAME'] ?? 'root';
        $this->password = $_ENV['DB_PASSWORD'] ?? '';
    }

    // Get the database connection
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->db_name};charset=utf8mb4",
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );

            $this->ensureSchema($this->conn);
        } catch(PDOException $e) {
            error_log('Connection Error: ' . $e->getMessage());
            throw new Exception('Database connection error. Please try again later.');
        }

        return $this->conn;
    }
    
    // Prepare statement shortcut
    public function prepare($sql) {
        return $this->getConnection()->prepare($sql);
    }
    
    // Execute query shortcut
    public function query($sql) {
        return $this->getConnection()->query($sql);
    }
    
    // Last insert ID
    public function lastInsertId() {
        return $this->getConnection()->lastInsertId();
    }
    
    // Begin transaction
    public function beginTransaction() {
        return $this->getConnection()->beginTransaction();
    }
    
    // Commit transaction
    public function commit() {
        return $this->getConnection()->commit();
    }
    
    // Rollback transaction
    public function rollBack() {
        return $this->getConnection()->rollBack();
    }
}
?>
