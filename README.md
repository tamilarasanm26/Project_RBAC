# Role-Based Access Control (RBAC) Application

**MERN stack** application for **Role-Based Access Control (RBAC)***.

## Features

- **Role Management**:
  - Three roles: **Admin**, **Moderator**, and **User**.
  - Each role has specific access permissions:
    - **Admin**: Can add, delete, and edit blogs.
    - **Moderator**: Can edit blogs.
    - **User**: Can view blogs added by Admin.
  - New users can register with a username and password.

- **Authentication and Authorization**:
  - Secure authentication mechanisms implemented using JWT.
  - Passwords are hashed for security.

- **Tech Stack**:
  - **MERN (MongoDB, Express.js, React.js, Node.js)**:
    - **MongoDB**: A NoSQL database for efficient and scalable data storage.
    - **Express.js**: Backend framework for building RESTful APIs.
    - **React.js**: Frontend library for creating an interactive user interface.
    - **Node.js**: Server-side runtime for handling requests and logic.
  - **Vite**:
    - Provides fast development server and optimized production builds.

## Roles and Credentials

| Role       | Username   | Password   | Permissions                          |
|------------|------------|------------|--------------------------------------|
| Admin      | `admin`    | `admin`    | Add, delete, and edit blogs          |
| Moderator  | `moderator`| `moderator`| Edit blogs                           |
| User       | `user`     | `user`     | View blogs added by Admin            |



## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/rbac-mern-app.git
cd rbac-mern-app
```
2. Install Dependencies
Run the following command to install all required dependencies:

```terminal
npm install
```
3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
4. Run the Application
Backend
Navigate to the backend directory and start the backend server:

```
cd backend
nodemon server.js
```
Frontend
Navigate to the frontend directory and start the Vite development server:

```
cd frontend
npm run dev
```
## Screenshots

### 1.Register Page
<img width="958" alt="image" src="https://github.com/user-attachments/assets/8ae991db-3c30-4aa8-9e6c-1b67cd58739f">

### 2. Login Page
<img width="959" alt="image" src="https://github.com/user-attachments/assets/9523bef5-b970-4dbe-977e-f14eb50a86b4">

### 3. Admin Dashboard
<img width="908" alt="image" src="https://github.com/user-attachments/assets/41550eae-66fc-4c9d-8df9-038842b9cc41">

### 4. Moderator Dashboard
<img width="724" alt="image" src="https://github.com/user-attachments/assets/398df606-7072-4dd8-be47-5ae68e7d6e2c">

### 3. User Dashboard
<img width="497" alt="image" src="https://github.com/user-attachments/assets/0aeb9cde-970c-43e2-ad79-dcfdff6faf5d">










