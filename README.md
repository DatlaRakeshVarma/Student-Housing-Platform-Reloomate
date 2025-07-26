# RelooMate Backend API

A RESTful API backend for RelooMate - Student Housing Platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **User Management**: Registration, login, and profile management
- **Onboarding Content**: Structured onboarding flow for new users
- **Security**: Helmet.js, CORS, rate limiting, and input validation
- **Error Handling**: Comprehensive error handling with detailed logging
- **Validation**: Input validation using express-validator
- **Database**: MongoDB with Mongoose ODM

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd reloomate-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/reloomate

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d

   # CORS Configuration
   FRONTEND_URL=http://localhost:3000
   ```

   **Important**: Replace `JWT_SECRET` with a strong, unique secret key in production.

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB installation
   mongod
   
   # Or use MongoDB Atlas cloud database
   # Update MONGODB_URI in .env with your Atlas connection string
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your .env file).

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check
```http
GET /health
```
**Response:**
```json
{
  "success": true,
  "message": "RelooMate API is running!",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

#### 2. User Registration
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "_id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

#### 3. User Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "_id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

#### 4. Get User Profile (Protected)
```http
GET /api/profile
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "_id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

#### 5. Get Onboarding Content
```http
GET /api/onboarding
```

**Response:**
```json
{
  "success": true,
  "message": "Onboarding content retrieved successfully",
  "data": {
    "steps": [
      {
        "id": 1,
        "title": "Welcome to RelooMate",
        "description": "Find your perfect student housing match...",
        "image": "https://images.pexels.com/photos/276724/..."
      },
      {
        "id": 2,
        "title": "Smart Matching System",
        "description": "Our advanced algorithm considers...",
        "image": "https://images.pexels.com/photos/7947663/..."
      },
      {
        "id": 3,
        "title": "Safe & Secure Platform",
        "description": "All users are verified students...",
        "image": "https://images.pexels.com/photos/5935794/..."
      }
    ],
    "totalSteps": 3
  }
}
```

## 🧪 Testing with Postman

1. **Import Collection**: Use the provided Postman collection (if available)
2. **Set Environment Variables**:
   - `baseUrl`: `http://localhost:5000/api`
   - `token`: JWT token received from login/register

3. **Test Flow**:
   1. Test health check endpoint
   2. Register a new user
   3. Login with credentials
   4. Use the received token for protected routes
   5. Test profile endpoint
   6. Test onboarding endpoint

## 🏗️ Architecture & Design Decisions

### **Technology Stack**
- **Node.js + Express**: Fast, minimal web framework
- **MongoDB + Mongoose**: NoSQL database with elegant ODM
- **JWT**: Stateless authentication
- **bcryptjs**: Secure password hashing

### **Project Structure**
```
├── controllers/          # Business logic
├── middleware/          # Custom middleware (auth, error handling)
├── models/             # Database models
├── routes/             # API route definitions
├── server.js           # Main application file
├── .env               # Environment variables
└── README.md          # Documentation
```

### **Key Design Principles**
1. **Separation of Concerns**: Controllers, models, and routes are separated
2. **Security First**: Input validation, password hashing, JWT tokens
3. **Error Handling**: Comprehensive error handling with proper HTTP status codes
4. **Scalability**: Modular structure for easy feature additions
5. **React Native Ready**: CORS enabled, RESTful endpoints

### **Security Features**
- Password hashing with bcrypt (cost factor: 12)
- JWT token-based authentication
- Input validation and sanitization
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet.js for security headers

## 🐳 Docker Support (Optional)

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

USER node

CMD ["npm", "start"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/reloomate
    depends_on:
      - mongo

  mongo:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### Running with Docker
```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/reloomate` |
| `JWT_SECRET` | JWT signing secret | **Required** |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 🚀 Deployment

### Preparation
1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure production MongoDB URI
4. Set appropriate `FRONTEND_URL`

### Platform-specific guides
- **Heroku**: Add MongoDB Atlas, set environment variables
- **Railway**: Connect MongoDB, configure environment
- **DigitalOcean**: Use managed MongoDB, configure firewall

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

**Note**: This is a backend assessment project for RelooMate. The API is designed to integrate seamlessly with React Native applications and follows RESTful principles with proper authentication and error handling.