# Feature Flag Management System

A multi-tenant SaaS-like feature flag management system built with the MERN stack (MongoDB, Express, React, Node.js). This system enables organizations to manage feature flags, controlling which features are available to their users.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Roles & Responsibilities](#roles--responsibilities)
- [Applications](#applications)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication & Security](#authentication--security)
- [Setup & Installation](#setup--installation)
- [Development Guide](#development-guide)
- [Project Status](#project-status)

## Overview

This feature flag management system allows organizations to control feature availability across their applications. Feature flags enable gradual feature rollouts, A/B testing, and quick feature toggles without redeployment.

### Key Features
- **Multi-tenant Architecture**: Separate organizations with isolated data
- **Role-based Access Control**: Three distinct user roles with specific permissions
- **Feature Flag Management**: Create, read, update, and delete feature flags per organization
- **REST API Backend**: Built with Express.js and MongoDB
- **Three Frontend Applications**: Tailored UIs for each user role

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB with Mongoose v9.6.1
- **Authentication**: JWT (JSON Web Tokens) with HttpOnly cookies
- **Additional**: 
  - CORS for cross-origin requests
  - Cookie-parser for cookie handling
  - Dotenv for environment configuration

### Frontend
- **Build Tool**: Vite v8.0.10
- **UI Library**: React v19.2.5
- **Routing**: React Router DOM v7.15.0 (Super Admin only)
- **Linting**: ESLint

## System Architecture

### Pattern: MVC (Model-View-Controller)

The backend follows the MVC pattern for clean separation of concerns:

```
back-end/
├── config/          # Database connection configuration
├── controller/      # Business logic layer
├── middleware/      # JWT authentication & verification
├── model/           # Mongoose schemas & data models
├── routes/          # API endpoint definitions
└── server.js        # Application entry point
```

**Why MVC?**
- Clean separation between data, logic, and routes
- Easy to understand and maintain
- Appropriately sized for this project scope
- Scalable without unnecessary complexity

### Folder Structure

```
feature-flag-management-system/
├── back-end/                    # Express API server
├── super-admin-front-end/       # Super Admin UI
├── org-admin-front-end/         # Organization Admin UI
├── end-user-front-end/          # End User UI
└── wiki/                        # Documentation
```

## Roles & Responsibilities

### 1. Super Admin
- **Access**: Full system access via `/admin-panel`
- **Responsibilities**:
  - Create new organizations
  - Edit organization details
  - Delete organizations
  - View all organizations
- **Authentication**: Credentials stored in environment variables (`SUPER_ADMIN_USER_NAME`, `SUPER_ADMIN_USER_PASS`)
- **Frontend**: `super-admin-front-end`

### 2. Organization Admin
- **Access**: Organization-specific operations
- **Responsibilities**:
  - Manage feature flags within their organization
  - View organization details
  - Manage organization users
- **Frontend**: `org-admin-front-end` (in development)
- **Status**: Not yet fully implemented

### 3. End User
- **Access**: Read-only access to feature flags
- **Responsibilities**:
  - Check if features are enabled for their organization
  - Use feature flags in client applications
- **Frontend**: `end-user-front-end` (in development)
- **Status**: UI scaffold created, logic not yet implemented

## Applications

### Super Admin Frontend (`super-admin-front-end`)
- **Port**: 5173 (Vite dev server)
- **Key Files**:
  - `src/pages/Login.jsx`: Login form with username/password authentication
  - `src/pages/AdminPanel.jsx`: CRUD interface for organizations
  - `src/utils/ProtectedRoutes.jsx`: Route protection with token verification
- **Features**:
  - Login with super admin credentials
  - Create, read, update, and delete organizations
  - Protected routes requiring valid JWT token

### Organization Admin Frontend (`org-admin-front-end`)
- **Port**: 5174 (Vite dev server)
- **Status**: UI scaffold with boilerplate content
- **To Do**: Implement feature flag CRUD operations

### End User Frontend (`end-user-front-end`)
- **Port**: 5175 (Vite dev server)
- **Status**: UI scaffold with boilerplate content
- **To Do**: Implement feature flag display and verification

### Backend API (`back-end`)
- **Port**: 5000 (configurable via `PORT` env variable)
- **Description**: Express.js REST API serving all frontend applications
- **CORS Configuration**: Allows requests from ports 5173, 5174, 5175 with credentials

## Database Schema

### Organizations Collection
```javascript
{
  _id: ObjectId,
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```
- **Collection Name**: `organizations`
- **Required Fields**: `name`
- **Purpose**: Stores organization records

### Feature Flags Collection
```javascript
{
  _id: ObjectId,
  key: String (required),
  isEnabled: Boolean (default: false),
  orgId: ObjectId (ref: "Organization"),
  createdAt: Date,
  updatedAt: Date
}
```
- **Collection Name**: `featureFlag`
- **Required Fields**: `key`
- **Purpose**: Stores feature flags with organization association
- **Indexing**: Consider indexing on `orgId` and `key` for performance

### Users Collection
```javascript
{
  _id: ObjectId,
  userName: String (required),
  email: String (required, unique),
  password: String (required),
  orgId: ObjectId (ref: "Organization"),
  createdAt: Date,
  updatedAt: Date
}
```
- **Collection Name**: `users`
- **Required Fields**: `userName`, `email`, `password`
- **Purpose**: Stores organization admin and user accounts
- **Constraints**: Email must be unique across system

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/superadminlogin` | Super admin login | No |
| GET | `/api/verify` | Verify JWT token | Yes |

### Organizations (CRUD)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/organizations` | Get all organizations | Yes |
| POST | `/api/organizations` | Create organization | Yes |
| PATCH | `/api/organizations/:orgId` | Update organization | Yes |
| DELETE | `/api/organizations/:orgId` | Delete organization | Yes |

### Request/Response Examples

**Login Request:**
```json
POST /api/superadminlogin
{
  "username": "admin",
  "password": "password123"
}
```

**Create Organization:**
```json
POST /api/organizations
{
  "name": "Acme Corp"
}
```

**Update Organization:**
```json
PATCH /api/organizations/:orgId
{
  "name": "Acme Corporation"
}
```

## Authentication & Security

### JWT Token Flow
1. Super admin logs in with credentials
2. Server validates credentials against environment variables
3. JWT token generated with payload: `{ user: { username }, role: "admin" }`
4. Token sent as HttpOnly cookie (`maxAge: 24 hours`)
5. Token verified on protected routes via middleware

### Security Features
- **HttpOnly Cookies**: Prevents XSS attacks
- **SameSite=Lax**: Prevents CSRF attacks (set to `secure: false` for development)
- **Token Expiration**: 24-hour expiration
- **Environment Variables**: Sensitive data stored in `.env`
- **CORS Whitelisting**: Only specified frontend ports allowed

### Middleware
- **verifyToken**: Validates JWT token from cookies and attaches user to request

### Known Issues
- Super admin credentials hardcoded in environment variables (acceptable for single admin)
- Password stored in plain text in `users` collection (should hash passwords for production)
- No rate limiting on login attempts
- Secure flag set to `false` for development (must be `true` in production)

## Setup & Installation

### Prerequisites
- Node.js v16+
- MongoDB instance
- npm or yarn

### Backend Setup
```bash
cd back-end
npm install
```

### Create `.env` file
```env
MONGO_URI=mongodb://localhost:27017/feature-flag-system
PORT=5000
SECRET_KEY=your_secret_key_here
SUPER_ADMIN_USER_NAME=admin
SUPER_ADMIN_USER_PASS=password123
```

### Start Backend
```bash
npm run dev   # Development with nodemon
npm start     # Production
```

### Frontend Setup
```bash
cd super-admin-front-end
npm install
npm run dev
```

Repeat for `org-admin-front-end` and `end-user-front-end`

## Development Guide

### Adding a New Feature Flag
1. Define API endpoint in `back-end/routes/orgRoutes.js`
2. Implement controller logic in `back-end/controller/orgController.js`
3. Create/update Mongoose model in `back-end/model/featureFlag.js`
4. Update frontend to consume endpoint

### Adding a New User Role
1. Add role field to users collection
2. Update JWT payload to include role
3. Create role-based middleware for authorization
4. Create new frontend application
5. Implement role-specific features

### Testing Endpoints
Use tools like Postman or curl to test API endpoints. Don't forget to include credentials for protected endpoints:

```bash
curl -X GET http://localhost:5000/api/organizations \
  -H "Cookie: token=your_jwt_token"
```

## Project Status

### Completed ✅
- Organization CRUD (Create, Read, Update, Delete)
- Super Admin authentication & login
- Backend API structure and authentication middleware
- Super Admin frontend with protected routes
- Database schema design

### In Progress 🔄
- Feature flag CRUD operations

### To Do 📋
- Feature flag CRUD routes and controllers
- Feature flag frontend interfaces
- Organization Admin signup/login functionality
- Organization Admin feature flag management UI
- End User feature flag checking UI
- Input validation and error handling
- Database indexing for performance
- Integration tests
- Password hashing for user accounts
- Rate limiting and security hardening