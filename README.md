# Task Manager Web Application

## Description
This is a Task Manager web application where users can register, login, create tasks, edit, delete tasks, and filter tasks by status (Pending/Completed). The app has a responsive design using Bootstrap.

## Features
- User registration and login
- Add, edit, and delete tasks
- Task status update (Pending / Completed)
- Responsive design using Bootstrap
- Welcome message for logged-in users

## Tech Stack
- Frontend: React.js, Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB
- HTTP Client: Axios

## Installation / Setup
1. Clone the repository:
```bash
git clone https://github.com/dilja2001/newtask.git


2. Backend Setup

Go to backend folder (if backend is inside a folder called backend):

cd backend

Install dependencies:

npm install

Create a .env file in the backend folder with these environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server:

node server.js

The backend will run on http://localhost:5000


3. Frontend Setup

Go to frontend folder (if frontend is inside a folder called frontend):

cd frontend

Install dependencies:

npm install

Start the React app:

npm run dev

The frontend will run on another port

Environment Variables

PORT → The port backend server runs on

MONGO_URI → MongoDB connection URL

JWT_SECRET → Secret key for user authentication
