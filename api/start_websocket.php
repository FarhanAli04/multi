<?php
/**
 * WebSocket Server Startup Script
 * Run this command to start the WebSocket server:
 * php start_websocket.php
 */

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Include the WebSocket server
require_once __DIR__ . '/websocket_server.php';

echo "Starting WebSocket server...\n";
echo "WebSocket URL: ws://localhost:" . ($_ENV['WEBSOCKET_PORT'] ?? '8080') . "\n";
echo "Press Ctrl+C to stop the server\n";
echo "---\n";
