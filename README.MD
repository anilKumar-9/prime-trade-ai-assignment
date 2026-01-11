# Prime Trade AI – Assessment Project

🔗 **Live Application**  
https://prime-trade-ai-assignment-phi.vercel.app/

---

## Overview

**Prime Trade AI** is a role-based task management system developed as part of a technical assessment.  
The project is **backend-focused**, emphasizing authentication, authorization, and clean REST API design, with a minimal frontend for demonstration.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

### Frontend
- React (Vite)
- React Router
- Axios

---

## Roles & Permissions

### Admin
- View all users
- Create and assign tasks
- View all tasks
- Delete any task

### User
- Register and login
- View only assigned tasks

---

## API Overview

### Authentication
- `POST /auth/register`
- `POST /auth/login`

### Users (Admin Only)
- `GET /users`
- `PUT /users/:id/promote`

### Tasks
- `GET /tasks` – User: own tasks, Admin: all tasks
- `GET /tasks/all` – Admin only
- `POST /tasks` – Admin only
- `DELETE /tasks/:id` – Admin only

---

## Demo Credentials

**Admin Account**

Email: admin@test.com  
Password: 8978281820

---

## How to Test

1. Open the live application
2. Login using the admin credentials
3. Create tasks and assign them to users
4. Register a new user
5. Login as the registered user
6. Verify the user sees only assigned tasks
7. Verify admin can view and delete all tasks

---



