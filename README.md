To-Do App (MERN Stack)

A simple To-Do app built using the MERN stack (MongoDB, Express, React, Node.js) with JWT authentication.

Features

User registration and login with JWT authentication

Secure password hashing using bcrypt

Create, read, update, and delete (CRUD) tasks

Protected routes for authenticated users

Responsive UI

Tech Stack

Frontend: React, React Router, Axios

Backend: Node.js, Express

Database: MongoDB, Mongoose

Authentication: JWT, bcrypt

Installation

Prerequisites

Make sure you have the following installed:

Node.js

MongoDB

Git (optional, for cloning the repo)

Clone the Repository

https://github.com/yasserjrr/To-Do-App.git

Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file and add the following environment variables:

 ACCESS_TOKEN_SECRET=e91552faa0d0b0ba01582270a588351d69cc795bf65256f4dc490e2352cef6f8e47e09d4a71703a151608a9ee3cdbaec22229b8b3304580bc9d9d18e84e60aee
 REFRESH_TOKEN_SECRET=bb797815c35db4919b8efdbba608c7031e00f09cc1e3fcb3cb36998615d6cd0bd6e77cfebac6481dbd09d31f11a387863f480cf8b406809e346bf3b3a56f4dc2

 MONGO_URI="mongodb://localhost:27017/todo"
PORT=3000

Start the backend server:

npm start

The backend should now be running on http://localhost:5000.

Frontend Setup

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the frontend:

npm start

The frontend should now be running on http://localhost:3000.

API Routes

Authentication

POST /register - Register a new user

POST /login - Authenticate user and return JWT

Tasks (Protected Routes)

GET /tasks - Get all tasks for the authenticated user

POST /tasks - Create a new task

PUT /tasks/:id - Update a task

DELETE /tasks/:id - Delete a task

Dependencies

Backend

express

mongoose

jsonwebtoken

bcryptjs

dotenv

cors

Frontend

react

react-router-dom

axios

License

This project is open-source and available under the MIT License.

Contact

For any questions or suggestions, feel free to reach out or open an issue!

Happy coding! 🚀
