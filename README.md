Task Management API
This is a complete CRUD API for a task management application, built with Node.js, Express, and MongoDB. It provides endpoints to create, read, update, and delete tasks, featuring robust error handling and data validation.

Features
Create: Add new tasks with a title, description, status, and due date.

Read: Fetch a list of all tasks or a single task by its unique ID or title.

Update: Modify the details of an existing task.

Delete: Remove a task from the database.

Data Validation: Ensures that incoming data (e.g., required title) meets the schema requirements.

Error Handling: Provides clear error messages for invalid requests or server issues.

Technology Stack
Backend: Node.js

Framework: Express.js

Database: MongoDB with Mongoose ODM

Environment Variables: dotenv

Development: nodemon for live server reloading

Setup and Installation
Clone the Repository

Install Dependencies

npm install

Create Environment File
Create a file named .env in the root of your project and add your MongoDB connection string. Use the .env.example file as a template.

MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
PORT=3000

Run the Server
For development with auto-reloading:

npm run dev

To start the server in production:

npm start

The API will be running at http://localhost:3000.

API Endpoint Documentation
All endpoints are prefixed with /api/tasks.

1. Create a New Task

Endpoint: POST /api/tasks

Description: Adds a new task to the database.

Request Body (JSON):

{
  "title": "Set Up Project Backend",
  "description": "Initialize Node.js project and install all required dependencies like Express and Mongoose.",
  "status": "In Progress",
  "dueDate": "2025-09-15T00:00:00.000Z"
}

Success Response (201 Created):

{
  "message": "Task created successfully",
  "task": {
    "_id": "66d6d4a5b4c1f3d2f4a9b4c1",
    "title": "Set Up Project Backend",
    "description": "Initialize Node.js project...",
    "status": "In Progress",
    "dueDate": "2025-09-15T00:00:00.000Z",
    "createdAt": "2025-09-02T17:30:13.842Z",
    "__v": 0
  }
}

Error Response (400 Bad Request):

{
  "message": "Title is a required field."
}

2. Get All Tasks

Endpoint: GET /api/tasks

Description: Retrieves a list of all tasks.

Success Response (200 OK):

[
  {
    "_id": "66d6d4a5b4c1f3d2f4a9b4c1",
    "title": "Set Up Project Backend",
    "description": "...",
    "status": "In Progress",
    "dueDate": "2025-09-15T00:00:00.000Z",
    "createdAt": "..."
  },
  {
    "_id": "66d6d4e3b4c1f3d2f4a9b4c5",
    "title": "Design Database Schema",
    "description": "Define the Mongoose schema for the tasks collection.",
    "status": "To Do",
    "dueDate": null,
    "createdAt": "..."
  }
]

3. Get a Single Task

Endpoint: GET /api/tasks/:identifier

Description: Retrieves a single task by its _id or title.

Example URL: http://localhost:3000/api/tasks/66d6d4a5b4c1f3d2f4a9b4c1

Success Response (200 OK):

{
  "_id": "66d6d4a5b4c1f3d2f4a9b4c1",
  "title": "Set Up Project Backend",
  "description": "...",
  "status": "In Progress",
  "dueDate": "2025-09-15T00:00:00.000Z",
  "createdAt": "..."
}

Error Response (404 Not Found):

{
  "message": "Task not found."
}

4. Update a Task

Endpoint: PUT /api/tasks/:id

Description: Modifies an existing task identified by its _id.

Example URL: http://localhost:3000/api/tasks/66d6d4e3b4c1f3d2f4a9b4c5

Request Body (JSON):

{
  "status": "Done",
  "description": "The Mongoose schema for the tasks collection has been finalized and implemented."
}

Success Response (200 OK):

{
  "message": "Task updated successfully",
  "task": {
    "_id": "66d6d4e3b4c1f3d2f4a9b4c5",
    "title": "Design Database Schema",
    "description": "The Mongoose schema for the tasks collection has been finalized and implemented.",
    "status": "Done",
    "dueDate": null,
    "createdAt": "..."
  }
}

Error Response (404 Not Found):

{
  "message": "Task not found."
}

5. Delete a Task

Endpoint: DELETE /api/tasks/:id

Description: Removes a task from the database by its _id.

Example URL: http://localhost:3000/api/tasks/66d6d4e3b4c1f3d2f4a9b4c5

Success Response (200 OK):

{
  "message": "Task deleted successfully."
}

Error Response (400 Bad Request):

{
  "message": "Invalid Task ID format."
}

