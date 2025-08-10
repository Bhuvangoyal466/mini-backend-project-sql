# School Management API

A Node.js + Express.js + MySQL backend API for managing schools with location-based features.

## Features

- **Add School**: POST endpoint to add schools with validation
- **List Schools**: GET endpoint that returns schools sorted by distance from user location
- **Distance Calculation**: Uses Haversine formula for accurate distance calculation
- **Input Validation**: Comprehensive validation for all inputs
- **MySQL Integration**: Uses connection pooling for optimal database performance

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
1. Create a MySQL database named `school_management`
2. Run the SQL script in `database_setup.sql` to create the schools table
3. Copy `.env.example` to `.env` and update with your database credentials:
```bash
cp .env.example .env
```

### 3. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- **GET** `/` - API status and available endpoints

### Add School
- **POST** `/api/addSchool`
- **Body**:
```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

### List Schools
- **GET** `/api/listSchools?latitude=40.7128&longitude=-74.0060`
- Returns schools sorted by distance from provided coordinates

## Project Structure

```
├── server.js          # Main entry point
├── db.js              # Database connection configuration
├── routes/
│   └── schools.js     # School-related API routes
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
└── database_setup.sql # MySQL table creation script
```

## Environment Variables

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
PORT=3000
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - MySQL driver with Promise support
- **dotenv** - Environment variable management
- **ES Modules** - Modern JavaScript module system
