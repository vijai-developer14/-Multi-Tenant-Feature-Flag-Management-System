# API Routes

Base URL — `http://localhost:5000/api`

## Auth Routes
| Method | Endpoint           | Auth     | Description              |
|--------|--------------------|----------|--------------------------|
| POST   | /superadminlogin   | Public   | Super Admin login        |
| GET    | /verify            | Protected| Verify JWT token         |
| POST   | /admin/signup      | Public   | Org Admin signup         |
| POST   | /admin/login       | Public   | Org Admin login          |
| POST   | /logout            | Protected| Clear JWT cookie         |

## Organisation Routes
| Method | Endpoint                  | Auth      | Description           |
|--------|---------------------------|-----------|-----------------------|
| GET    | /organizations            | Protected | Get all organisations |
| POST   | /organizations            | Protected | Create organisation   |
| PATCH  | /organizations/:orgId     | Protected | Update organisation   |
| DELETE | /organizations/:orgId     | Protected | Delete organisation   |

## Feature Flag Routes
| Method | Endpoint          | Auth      | Description              |
|--------|-------------------|-----------|--------------------------|
| GET    | /flags            | Protected | Get flags for admin's org|
| POST   | /flags            | Protected | Create feature flag      |
| PATCH  | /flags/:flagId    | Protected | Update feature flag      |
| DELETE | /flags/:flagId    | Protected | Delete feature flag      |
| GET    | /flags/check      | Public    | Check if flag is enabled |