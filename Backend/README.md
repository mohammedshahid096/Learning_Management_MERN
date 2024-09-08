# LMS (Learning Management System) Project

# Backend Project Setup

This guide will help you set up the backend environment for development or production. The project uses MongoDB, Redis, and logging through Morgan and Winston etc....

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Docker](https://www.docker.com/) (for Redis setup)
- MongoDB (either locally installed or a production database)
- [Cloudinary Account](https://cloudinary.com/) (for media storage)
- [Razorpay Account](https://razorpay.com/) (for handling payments)
- Gmail account for sending emails via Nodemailer

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohammedshahid096/Learning_Management_MERN.git
cd Learning_Management_MERN
cd Frontend
```

### 2. Set Up MongoDB

First, you need to create a MongoDB database locally or use a production MongoDB instance.

- To install MongoDB locally, follow the [official guide](https://docs.mongodb.com/manual/installation/).
- Alternatively, you can use a service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a production database.

### 3. Set Up Redis

You will need Redis for caching and session management. You can either install Redis locally or use a cloud-based solution like [Redis Cloud](https://redis.com/solutions/cloud/).

##### To set up Redis locally using Docker:

```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

### 4. Installation of Modules

```bash
npm install
```

### 5. Adding Env

- create a .env file and keep in the root folder

```plaintext
Backend Folder/
│
├── public/
├── src/
│   ├── controllers
│   ├── models
│   ├── Routes
├── .env
├── .gitignore
├── package.json
└── app.js
└── server.js
```

### 4. Starting a Server

- make sure your redis server is also running
- default Mongodb URL: "mongodb://127.0.0.1:27017/LMS"
- default Redis URL: "redis://default:authpassword@127.0.0.1:6379"

```bash

npm start (node script)
or
npm run dev (nodemon script)
```

## Environment Variables

The project uses the following environment variables, which need to be configured in a `.env` file located in the root directory of the project.

```plaintext
# port
PORT = 8000
DEVELOPMENT_MODE = development
# DEVELOPMENT_MODE = production

# mongo db
DB_URL =
DB_URL_DEV = mongodb://127.0.0.1:27017/LMS

# redis db
REDIS_URL =
REDIS_URL_DEV = redis://default:authpassword@127.0.0.1:6379

# jwt
### activation key
JWT_SECRET_KEY =
### Access Token
ACCESS_TOKEN_KEY =
ACCESS_TOKEN_KEY_TIME = 5m
ACCESS_TOKEN_KEY_TIME_COOKIE = 5

### Refresh Token
REFRESH_TOKEN_KEY =
REFRESH_TOKEN_KEY_TIME = 3d
REFRESH_TOKEN_KEY_TIME_COOKIE = 3

# Access Origins
ALLOW_ORIGINS_ACCESS =["http://localhost:5173","http://localhost:3000"]


# nodemailer
NODEMAILER_SERVICE=gmail
NODEMAILER_HOST=smtp.gmail.com
NODEMAILER_PORT=587
NODEMAILER_USER= <Enter your gmail>
NODEMAILER_PASS= <Enter password >

# cloudinary
CLOUDINARY_NAME= <cloudinary name >
CLOUDINARY_API_KEY = < cloudinary key >
CLOUDINARY_API_SECRETKEY = < secret key >

# Razo Pay
RAZOPAY_API_KEY =
RAZOPAY_API_SECRET =
RAZOPAY_REDIRECT_URL = http://localhost:5173/course


# google console
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
GOOGLE_CALL_BACK_URL = http://localhost:8000/auth/google/callback


# session secret
SESSION_SECRET_KEY =
```
