# API Documentation

## Base URL

```bash
http://localhost:PORT
```

---

# 1. Super Admin APIs

---

## Super Admin Login

**Endpoint**

```http
POST /api/superadminlogin
```

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Description

Authenticates the super admin and creates a session using JWT stored in HTTP-only cookies.

---

## Verify Super Admin Authentication

**Endpoint**

```http
GET /api/verify
```

### Authentication Required

Yes

### Description

Verifies whether the super admin  is valid. Act as aroute protecter

---

# 2. Organization APIs

---

## Get Public Organizations

**Endpoint**

```http
GET /api/organizations/public
```

### Description

Returns organization data without authentication.

---

## Get All Organizations

**Endpoint**

```http
GET /api/organizations
```

### Authentication Required

Yes

### Description

Returns all organizations for authenticated admin users.

---

## Create Organization

**Endpoint**

```http
POST /api/organizations
```

### Authentication Required

Yes

### Request Body

```json
{
  "name": "ABC Technologies"
}
```

### Description

Creates a new organization.

---

## Update Organization

**Endpoint**

```http
PATCH /api/organizations/:orgId
```

### Authentication Required

Yes

### Description

Updates organization details using organization ID.

---

## Delete Organization

**Endpoint**

```http
DELETE /api/organizations/:orgId
```

### Authentication Required

Yes

### Description

Deletes an organization using organization ID.

---

# 3. Organization Admin APIs

---

## Organization Admin Signup

**Endpoint**

```http
POST /user/signup
```

### Request Body

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123"
}
```

### Description

Registers a new organization admin user.

---

## Organization Admin Login

**Endpoint**

```http
POST /user/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Description

Authenticates an organization admin.

---

## Verify Organization Admin Authentication

**Endpoint**

```http
GET /user/verifyOrg
```

### Authentication Required

Yes

### Description

Checks whether the organization admin  is valid. Act as aroute protecter

---

# 4. Feature Flag APIs

---

## Public Feature Flags

**Endpoint**

```http
GET /feature-flags/public/featurtes
```

### Description

Returns publicly accessible feature flags.


---

## Get Feature Flags

**Endpoint**

```http
GET /feature-flags/features
```

### Authentication Required

Yes

### Description

Returns all feature flags.

---

## Create Feature Flag

**Endpoint**

```http
POST /feature-flags/features
```

### Authentication Required

Yes

### Request Body

```json
{
  "featureName": "DarkMode",
  "enabled": true
}
```

### Description

Creates a new feature flag.

---

## Update Feature Flag

**Endpoint**

```http
PATCH /feature-flags/features/:featureId
```

### Authentication Required

Yes

### Description

Updates feature flag settings.

---

## Delete Feature Flag

**Endpoint**

```http
DELETE /feature-flags/features/:featureId
```

### Authentication Required

Yes

### Description

Deletes a feature flag.

---

# 5. End User Feature Access

---

## Check Feature Access

**Endpoint**

```http
POST /users/end-user
```

### Request Body

```json
{
  "organizationId": "org123",
  "featureName": "DarkMode"
}
```

### Description

Checks whether a specific feature is enabled for the end user’s organization.

---

# Authentication

Protected APIs use:

- JWT Authentication
- HTTP-only Cookies

---

# Roles

The system supports:

- Super Admin
- Organization Admin
- End User