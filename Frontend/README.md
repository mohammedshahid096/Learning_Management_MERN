# LMS (Learning Management System) Project

## React + Vite

# Frontend Project Setup

This project is created with [Vite](https://vitejs.dev/) and is designed for rapid development with easy-to-configure environment variables. Follow the steps below to get started with the project.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm or [yarn](https://yarnpkg.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohammedshahid096/Learning_Management_MERN.git
cd Learning_Management_MERN
cd Frontend
```

### 2. Installation of Modules

```bash
npm install
```

### 3. Adding Env

- create a .env file and keep in the root folder

```plaintext
Fronted Folder/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
├── .env
├── .gitignore
├── package.json
└── vite.config.js
```

### 4. Starting a Server

- make sure your backend server is started
- [Backend Setup Instructions](../Backend/README.md)

```bash
npm start
```

## Environment Variables

The project uses the following environment variables, which need to be configured in a `.env` file located in the root directory of the project.

```plaintext
# Development Mode
VITE_DEVELOPMENT_MODE=development
# VITE_DEVELOPMENT_MODE=production

# Server URL
VITE_SERVER_URL_API=<your-server-url>

# Auth0 Configuration
VITE_AUTH0_DOMAIN=<your-auth0-domain>
VITE_AUTH0_CLIENT=<your-auth0-client-id>
VITE_ACCESS_TOKEN_KEY_TIME_COOKIE=5

# Razorpay Key for payments in development mode
VITE_RAZOPAY_KEY=<your-razorpay-key>

# Sentry DSN for error tracking
VITE_SENTRY_DSN=<your-sentry-dsn>
```
