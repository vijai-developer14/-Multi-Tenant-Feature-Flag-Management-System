# Design Decisions & Trade-offs

## 1. Single Feature Flags Collection vs Per-Org Collections

**Considered:** Creating a separate MongoDB collection 
per organisation for feature flags.

**Rejected because:** 100 organisations = 100 collections. 
Impossible to manage, query, or maintain at scale.

**Chose:** Single `featureFlags` collection with `orgId` 
field on every document. The orgId filters flags per org 
automatically.

**Benefit:** Scales to any number of organisations with 
no structural changes.

---

## 2. MVC vs Clean Architecture

**Considered:** Clean Architecture with service layers, 
repositories, and DTOs.

**Rejected because:** Adds significant complexity and 
boilerplate for a 6-10 hour assignment scope. Would 
obscure the core logic rather than clarify it.

**Chose:** MVC — keeps routes, business logic, and data 
models cleanly separated without unnecessary abstraction.

---

## 3. Org Selection via Dropdown vs Invite Links

**Considered:** Invite-based onboarding where Super Admin 
sends a unique link to each Org Admin tied to their org.

**Rejected because:** Out of scope for this assignment. 
Adds significant complexity — token generation, email 
sending, expiry handling.

**Chose:** Public dropdown of organisations on signup. 
Simple and functional for the assignment scope.

**Production note:** In production, invite-based onboarding 
would replace the dropdown entirely — preventing cross-org 
data visibility.

---

## 4. No End User Authentication

**Considered:** End Users sign up and log in like Org Admins, 
with their org resolved from their session.

**Rejected because:** Requirements specify a simple form 
with no login for End Users.

**Chose:** Anonymous access — End User selects their org 
from a dropdown and enters a feature key to check.

**Production note:** In production, End Users would have 
accounts and org resolution would happen automatically 
from their session.

---

## 5. HTTP-only Cookies vs localStorage for JWT

**Considered:** Storing JWT in localStorage and sending 
via Authorization header.

**Rejected because:** localStorage is accessible via 
JavaScript — vulnerable to XSS attacks.

**Chose:** HTTP-only cookies — token is never accessible 
via JavaScript, protecting against XSS. Combined with 
`credentials: "include"` on all frontend fetch calls.

---

## 6. Vite vs Create React App

**Considered:** Create React App for all 3 frontends.

**Rejected because:** Slow setup, heavy node_modules, 
deprecated by the React team.

**Chose:** Vite — faster setup, faster hot reload, 
lighter build. Same React code, better tooling.