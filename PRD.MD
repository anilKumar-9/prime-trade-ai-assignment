# Product Requirements Document (PRD)
## Backend Developer Intern Assignment

---

## 1. Project Overview

This project aims to build a **secure, scalable REST API** with **JWT-based authentication** and **role-based access control**, along with a **basic frontend UI** to demonstrate and interact with the APIs.

The system supports user registration, login, and CRUD operations on a secondary entity (Tasks), ensuring proper authorization, validation, and clean API design.

---

## 2. Goals & Objectives

### Primary Goals
- Design clean and scalable REST APIs
- Implement secure authentication and authorization
- Demonstrate backend-to-frontend integration
- Follow industry-standard backend practices

### Success Criteria
- Users can register and log in securely
- JWT-protected routes work correctly
- Role-based access (User vs Admin) is enforced
- CRUD operations function correctly
- APIs are documented and easy to test

---

## 3. User Roles

### 1. User
- Can register and log in
- Can create, view, update, and delete **own tasks**
- Cannot access admin-only APIs

### 2. Admin
- Can log in
- Can view and manage **all users’ tasks**
- Has elevated access for administrative operations

---

## 4. Functional Requirements

### 4.1 Authentication & Authorization
- User registration with hashed passwords
- User login with JWT token generation
- JWT verification middleware
- Role-based access middleware (User / Admin)

### 4.2 User Management
- Register new users
- Login existing users
- Assign default role as `USER`
- Admin role assigned manually or via seed data

### 4.3 Task Management (Secondary Entity)
- Create a task
- View all tasks (role-based)
- View a task by ID
- Update a task
- Delete a task

### 4.4 API Versioning
- All APIs prefixed with `/api/v1`

### 4.5 Error Handling & Validation
- Input validation for request payloads
- Centralized error handling
- Meaningful HTTP status codes and error messages

---

## 5. API Endpoints (High-Level)

### Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Tasks
- `POST /api/v1/tasks`
- `GET /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PUT /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

---

## 6. Database Design

### User Collection / Table
- id
- name
- email (unique)
- password (hashed)
- role (USER | ADMIN)
- createdAt

### Task Collection / Table
- id
- title
- description
- userId (reference to User)
- createdAt
- updatedAt

---

## 7. Non-Functional Requirements

### Security
- Password hashing using bcrypt
- JWT-based stateless authentication
- Protected routes using middleware
- Input sanitization and validation

### Scalability
- Modular folder structure
- Stateless backend services
- API versioning support
- Easily extendable for new modules

### Performance
- Optimized database queries
- Lightweight frontend for faster load times

---

## 8. Frontend Requirements (Basic)

### Technology
- React.js (Vite or CRA)
- Axios for API calls

### Features
- User registration form
- Login form
- Protected dashboard
- Task CRUD UI
- Display API success and error messages

### Authentication Flow
- JWT stored on login
- JWT sent via Authorization header
- Logout clears token

---

## 9. API Documentation

- Swagger UI available at `/api-docs`
- OR Postman collection provided
- Clear request/response examples

---

## 10. Logging & Monitoring

- Basic request and error logging
- Logs for authentication and authorization failures

---

## 11. Scalability & Future Enhancements

- Redis caching for frequent read operations
- Microservices separation (Auth Service, Task Service)
- Docker containerization
- Load balancer for horizontal scaling
- Refresh token implementation

---

## 12. Assumptions & Constraints

- Assignment completion time: 3 days
- Focus on backend over UI aesthetics
- No third-party auth providers used
- Deployment is optional

---

## 13. Deliverables

- Backend GitHub repository with README.md
- Working authentication & CRUD APIs
- Basic frontend UI
- API documentation (Swagger/Postman)
- Scalability notes

---

## 14. Evaluation Metrics

- API design & REST principles
- Database schema quality
- Security best practices
- Frontend-backend integration
- Code structure and documentation

---

## 15. Conclusion

This project demonstrates practical backend engineering skills, secure API development, and a scalable architecture approach suitable for real-world applications.
