# Architecture

## Pattern — MVC (Model View Controller)

### Why MVC?
- Express is naturally MVC-friendly
- Clean separation between data, logic, and routes
- Easy to understand and explain
- Right-sized for this project scope

### Folder Structure
back-end/
├── config/         # Database connection
├── controller/     # Business logic
├── middleware/     # JWT auth verification
├── model/          # MongoDB schemas
├── routes/         # API endpoints
└── server.js       # Entry point

### Why not other patterns?
- **Clean Architecture** — too complex for this scope, 
  would add unnecessary service and repository layers
- **Microservices** — overkill for a single-team assignment
- **MVVM** — frontend pattern, not suited for Express backend