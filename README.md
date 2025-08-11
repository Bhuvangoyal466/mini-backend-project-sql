# School Management API

A Node.js + Express.js + MySQL backend API for managing schools with location-based features. This API allows you to add schools and retrieve them sorted by distance from user location using the Haversine formula.

## 🚀 Live API URLs
- **Add School**: `POST https://mini-backend-project-sql-production.up.railway.app/api/addSchool`
- **List Schools**: `GET https://mini-backend-project-sql-production.up.railway.app/api/listSchools?latitude=30.9045&longitude=77.0967`
- **Health Check**: `GET https://mini-backend-project-sql-production.up.railway.app/`

## 📋 Postman Collection
[Download Postman Collection](./postman-collection.json) - Import this into Postman to test all API endpoints with sample data.

## 🛠 Tech Stack
- **Node.js** - Runtime environment
- **Express.js** - Web framework  
- **MySQL** - Database
- **Railway** - Cloud deployment platform
- **ES Modules** - Modern JavaScript module system

## 🗄️ Database Schema

### Schools Table
```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## ⚡ Features
- **Add School**: POST endpoint with comprehensive validation
- **List Schools**: GET endpoint that returns schools sorted by distance from user location
- **Distance Calculation**: Uses Haversine formula for accurate distance calculation in kilometers
- **Input Validation**: Validates coordinates, required fields, and data types
- **MySQL Integration**: Uses connection pooling for optimal performance
- **Cloud Deployment**: Fully deployed on Railway with cloud MySQL database

## 🔧 Setup Instructions

### Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/Bhuvangoyal466/mini-backend-project-sql.git
cd mini-backend-project-sql
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
1. Create a MySQL database named `school_management`
2. Run the SQL script in `database_setup.sql` to create the schools table
3. Copy `.env.example` to `.env` and update with your database credentials:
```bash
cp .env.example .env
```

### 4. Configure Environment Variables
Update `.env` file with your MySQL database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306
PORT=3000
```

### 5. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📱 API Endpoints

### Health Check
- **GET** `/` - API status and available endpoints
- **Response**: API information and available endpoints

### Add School
- **POST** `/api/addSchool`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "name": "DAV Public School Solan",
  "address": "Chambaghat, Solan, Himachal Pradesh 173213",
  "latitude": 30.9045,
  "longitude": 77.0967
}
```
- **Response**: Created school details with ID

### List Schools by Distance
- **GET** `/api/listSchools?latitude=30.9045&longitude=77.0967`
- **Query Parameters**:
  - `latitude` (required): User's latitude coordinate
  - `longitude` (required): User's longitude coordinate
- **Response**: Schools sorted by distance from provided coordinates

## 📁 Project Structure

```
├── server.js              # Main entry point and Express setup
├── db.js                  # Database connection configuration
├── routes/
│   └── schools.js         # School-related API routes and business logic
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── database_setup.sql    # MySQL table creation script
└── README.md            # Project documentation
```

## 🌍 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
DB_PORT=3306

# Server Configuration
PORT=3000
```

## 🧪 Testing with Sample Data

### Sample School Data for Solan, Himachal Pradesh:

```json
{
  "name": "St. Luke's Senior Secondary School",
  "address": "Mall Road, Solan, Himachal Pradesh 173212",
  "latitude": 30.9020,
  "longitude": 77.1015
}
```

### Sample API Calls:

**Add School:**
```bash
curl -X POST https://mini-backend-project-sql-production.up.railway.app/api/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pinegrove School",
    "address": "Subathu Road, Dharampur, Solan, HP 173209",
    "latitude": 30.8856,
    "longitude": 77.0845
  }'
```

**List Schools:**
```bash
curl "https://mini-backend-project-sql-production.up.railway.app/api/listSchools?latitude=30.9045&longitude=77.0967"
```

## 🚀 Deployment

This project is deployed on **Railway** with:
- **App Hosting**: Railway App Service
- **Database**: Railway MySQL Service
- **Auto-deployment**: Connected to GitHub for automatic deployments

### Deployment URL
**Production API**: https://mini-backend-project-sql-production.up.railway.app

## 📊 API Response Examples

### Successful School Addition (201 Created)
```json
{
  "message": "School added successfully",
  "schoolId": 1,
  "school": {
    "id": 1,
    "name": "DAV Public School Solan",
    "address": "Chambaghat, Solan, Himachal Pradesh 173213",
    "latitude": 30.9045,
    "longitude": 77.0967
  }
}
```

### Schools List with Distance (200 OK)
```json
{
  "message": "Schools retrieved successfully",
  "userLocation": {
    "latitude": 30.9045,
    "longitude": 77.0967
  },
  "totalSchools": 2,
  "schools": [
    {
      "id": 1,
      "name": "DAV Public School Solan",
      "address": "Chambaghat, Solan, Himachal Pradesh 173213",
      "latitude": 30.9045,
      "longitude": 77.0967,
      "distance": 0
    },
    {
      "id": 2,
      "name": "St. Luke's Senior Secondary School",
      "address": "Mall Road, Solan, Himachal Pradesh 173212",
      "latitude": 30.902,
      "longitude": 77.1015,
      "distance": 0.45
    }
  ]
}
```

## 🔍 Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- Invalid coordinate ranges
- Database connection issues
- Malformed JSON requests

### Example Error Response (400 Bad Request)
```json
{
  "error": "Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180"
}
```

## 👨‍💻 Author
**Bhuvan Goyal**  
GitHub: [@Bhuvangoyal466](https://github.com/Bhuvangoyal466)

---

⭐ **Star this repository if you found it helpful!**
