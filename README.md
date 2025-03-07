# Task Management Application

## 🌍 Live Demo
[link](https://task-management-assignment2.netlify.app)

## Overview
This is the frontend repository of Task Management application built using Reactjs Typescript and Vite

## Features
- User authentication (Signup, Login, Logout)
- Create, edit, and delete tasks
- Mark tasks as completed or pending
- Set due dates for tasks
- Filter and sort tasks


## Technologies Used
- **Frontend:** React , Typescript , ContextApi , React Router, Mui(component-library)
- **Deployment:** Netlify

## Installation
### Prerequisites
- Node.js and npm installed


### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/GanpatHada/task_management_frontend.git
   cd task_management_frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
  Create a `.env` file in the root directory and add:
  ```env
  VITE_BACKEND_BASE_URL=http://localhost:5000
  ```
  *(Change `http://localhost:5000` based on your backend server URL.)*

4. Run the application:
   ```sh
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:5173
   ```
   *(Vite’s default port is `5173`, but it may change based on your setup.)*


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

