# Doctor Connect Backend

This is the Express.js backend for the Doctor Connect application.

## Features

- User authentication (JWT)
- Role-based access control (Patient, Doctor, Admin)
- Doctor management
- Patient management
- Appointment scheduling
- MySQL database with Sequelize ORM

## Prerequisites

- Node.js (v16+)
- MySQL database

## Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd doctor-connect/server
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the server root directory with the following variables:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<your-mysql-password>
DB_NAME=doctor_connect
JWT_SECRET=<your-jwt-secret-key>
JWT_EXPIRES_IN=7d
```

4. **Create the database**

```sql
CREATE DATABASE doctor_connect;
```

5. **Start the server**

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info (requires auth)

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `PUT /api/users/:id/password` - Change password
- `DELETE /api/users/:id` - Delete user (admin only)

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/search` - Search doctors by specialty
- `GET /api/doctors/:id` - Get doctor by ID
- `PUT /api/doctors/:id` - Update doctor profile

### Patients

- `GET /api/patients` - Get all patients (admin and doctors only)
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient profile

## Data Models

### User

Base user model with authentication.

### Doctor

Extends User with doctor-specific fields.

### Patient

Extends User with patient-specific fields.

### Appointment

Manages appointments between doctors and patients.

## Technology Stack

- Express.js
- MySQL
- Sequelize ORM
- JSON Web Tokens
- bcrypt for password hashing 