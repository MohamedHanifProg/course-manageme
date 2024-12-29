const express = require('express');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const authenticate = require('./middleware/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(logger);         // Log incoming requests

// Connect to Database
connectDB();

// Routes
app.use('/api/students', require('./routes/studentRoutes')); // Student-related routes
app.use('/api/staff', require('./routes/staffRoutes'));       // Staff-related routes
app.use('/api/courses', require('./routes/courseRoutes'));   // Course-related routes

// Example of a Protected Route
app.get('/api/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).send('API is running...');
});

// Handle 404 Errors (Undefined Routes)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handling Middleware
app.use(errorHandler);

// Start the Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
