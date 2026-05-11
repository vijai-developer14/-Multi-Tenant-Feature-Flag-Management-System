# Database Design

## Database — MongoDB

## Collections

### 1. organisations
Stores all organisations created by Super Admin.

| Field      | Type     | Description                    |
|------------|----------|--------------------------------|
| _id        | ObjectId | Auto-generated unique ID       |
| name       | String   | Organisation name              |
| createdAt  | Date     | Auto-generated timestamp       |
| updatedAt  | Date     | Auto-generated timestamp       |

### 2. users
Stores Organisation Admin accounts only.
Super Admin is config-based. End Users are anonymous.

| Field      | Type     | Description                    |
|------------|----------|--------------------------------|
| _id        | ObjectId | Auto-generated unique ID       |
| userName   | String   | Admin's name                   |
| email      | String   | Unique email                   |
| password   | String   | Bcrypt hashed password         |
| orgId      | ObjectId | Reference to organisations     |
| createdAt  | Date     | Auto-generated timestamp       |

### 3. featureFlags
Stores all feature flags for all organisations.
Separated by orgId field.

| Field      | Type     | Description                    |
|------------|----------|--------------------------------|
| _id        | ObjectId | Auto-generated unique ID       |
| key        | String   | Feature key eg. dark_mode      |
| isEnabled  | Boolean  | Enabled or disabled            |
| orgId      | ObjectId | Reference to organisations     |
| createdAt  | Date     | Auto-generated timestamp       |