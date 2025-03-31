# Task Management Application

A full-stack task management application with React frontend and Node.js backend.

## Prerequisites

1. Install [Node.js and npm](https://nodejs.org/) (LTS version recommended)
2. Install [MongoDB](https://www.mongodb.com/try/download/community)

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the backend directory with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your-secret-key
   ```
4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Features
- User authentication (signup/login)
- Create, read, update, and delete tasks
- Task prioritization
- Task status tracking
- Responsive design for mobile and desktop
- Form validation

## Tech Stack
- Frontend: React, React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
