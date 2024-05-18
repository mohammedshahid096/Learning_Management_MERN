# LMS (Learning Management System) Project

## Overview

This project is a **Learning Management System (LMS)** developed using the **MERN stack** (MongoDB, Express.js, React, Node.js). The LMS is designed to facilitate online education by providing a platform for teachers and students to interact, manage courses, and track progress. **Redis** is used for caching to improve performance. The project includes different roles such as Admin and User (Teacher). The Teacher role functionalities are currently pending implementation.

## Features

- **Admin Role**: Manages the system, adds/removes users, and oversees overall operations.
- **User Role (Teacher)**: Intended to manage courses and students, but is currently under development.
- **Authentication**: Secure login for different roles.
- **Course Management**: Create, update, delete, and manage courses (Admin functionality).
- **User Management**: Admin can manage user accounts and permissions.
- **Course Data**: Courses are populated using data scraped from YouTube.
- **Payment Integration**: Payments are handled using Razorpay. Dummy payments are set up for testing purposes.

## Technology Stack

- **Frontend**: React, deployed on Vercel.
- **Backend**: Node.js, Express.js, deployed on Render.
- **Database**: MongoDB
- **Caching**: Redis
- **Web Scraping**: Used for fetching course data from YouTube.
- **Payment Gateway**: Razorpay

## Production Links

- **Frontend**: [LMS Frontend on Vercel](https://learning-management-mern.vercel.app/)
  https://learning-management-mern.vercel.app/
- **Backend**: [LMS Backend on Render](https://your-backend-link.render.com)

## Setup and Installation

For detailed setup and installation instructions, please refer to the README files in the respective frontend and backend folders:

- [Frontend Setup Instructions](./Frontend/README.md)
- [Backend Setup Instructions](./Backend/README.md)

## Credentials for Testing

Use the following credentials to login and test different roles:

| Role    | Email                 | Password    |
| ------- | --------------------- | ----------- |
| Admin   | admin@example.com     | Admin@123   |
| Teacher | teacher@example.com   | Teacher@123 |
| User    | user@example.com      | User@123    |
| User    | tapirow782@bsomek.com | Test@123    |
| User    | merabec951@huleos.com | Test@123    |

## Project Timeline

This project was completed over a span of **2 to 3 months**.

## Deployment

- **Frontend**: Deployed on Vercel.
- **Backend**: Deployed on Render.

---

Feel free to explore the project, contribute, and provide feedback!
