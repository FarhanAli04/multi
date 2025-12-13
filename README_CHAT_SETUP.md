# Real-Time Chat System Setup

## Overview
Complete real-time chat system with database integration, WebSocket communication, and role-based access between Admin, Seller, and Customer users.

## Database Setup

1. **Import the database schema:**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

2. **Database includes:**
   - Users table with roles (admin, seller, customer)
   - Sellers table for seller details
   - Conversations table for chat sessions
   - Conversation participants (many-to-many)
   - Messages table with read status
   - Message read receipts

## Backend Setup

1. **Install PHP dependencies:**
   ```bash
   cd api
   composer install
   ```

2. **Configure environment:**
   - Edit `api/.env` with your database credentials
   - Update JWT secret key for production

3. **Start API server:**
   ```bash
   cd api
   php -S localhost:8000 start_api.php
   ```

4. **Start WebSocket server:**
   ```bash
   cd api
   php start_websocket.php
   ```

## Frontend Setup

1. **Install React dependencies:**
   ```bash
   npm install
   npm install react-router-dom jwt-decode firebase/php-jwt
   ```

2. **Start React app:**
   ```bash
   npm start
   ```

## Default Admin Account
- Email: admin@example.com
- Password: admin123

## Features Implemented

### Authentication
- JWT-based authentication
- Role-based access control
- Secure password hashing
- Token validation

### Real-Time Chat
- WebSocket communication
- Live message delivery
- Typing indicators
- Read receipts
- Online/offline status
- Message history from database

### Database Integration
- All messages stored in database
- Conversation management
- User status tracking
- No mock data - fully database-driven

### API Endpoints
- `/api/auth/login` - User login
- `/api/auth/register` - User registration
- `/api/auth/me` - Get current user
- `/api/conversations` - List/create conversations
- `/api/conversations/{id}/messages` - Get conversation messages
- `/api/messages` - Send message
- `/api/messages/{id}/read` - Mark message as read
- `/api/users` - Find users to chat with

## Testing the System

1. **Login as admin** (admin@example.com / admin123)
2. **Create test users** via registration
3. **Start conversations** between different roles
4. **Test real-time features:**
   - Messages appear instantly
   - Typing indicators work
   - Read receipts update
   - Online status changes

## Port Configuration
- API Server: http://localhost:8000
- WebSocket Server: ws://localhost:8080
- React Frontend: http://localhost:3000

## Security Notes
- Change JWT_SECRET in production
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting
