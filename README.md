# FutureForge

FutureForge is a web application designed to provide personalized career guidance, skill development roadmaps, and progress tracking for users. Built with the MERN stack (MongoDB, Express, React, Node.js), this platform empowers users to navigate their career paths effectively.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Features

- Personalized learning roadmaps based on user input.
- Progress tracking to monitor skill development.
- Interactive chatbot for real-time assistance and queries.
- User authentication for secure access to personalized data.

## Technologies Used

- **Client:** 
  - React
  - React Router
  - Axios
  - React Icons
  - React Chatbot Kit
- **Server:** 
  - Node.js
  - Express
  - MongoDB (via Mongoose)
  - JWT for authentication
  - dotenv for environment variable management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (either local or MongoDB Atlas account)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MDFarhan-1/FutureForge.git

2. **Navigate to the project directory:**
   ```bash
    cd FutureForge

3. **Install dependencies for the client:**
   ```bash
    cd client
    npm install

4. **Install dependencies for the server:**
   ```bash
    cd ../server
    npm install

### Environment Variables
Create a .env file in the server directory and include the following variables:

```makefile

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.5ycpk.mongodb.net/
JWT_SECRET="your_jwt_secret"
PORT=5000
OPENAI_API_KEY=your_openai_api_key
```
Replace <username> and <password> with your MongoDB credentials, and your_jwt_secret and your_openai_api_key with your actual keys.

### Running the Application
To run the application, follow these steps:

Start the server: Open a terminal and navigate to the server directory, then run:

    cd server
    npm run dev

In another terminal, start the client: Navigate to the client directory, then run:

    cd client
    npm start
Your application should now be running at http://localhost:3000 for the client and http://localhost:5000 for the server.


## License
This project is licensed under the ISC License. See the LICENSE file for more details.

javascript


### Instructions:
- Update the placeholders in the environment variables section with your actual MongoDB credentials and JWT secret values.
- Create a .env file in the server directory
