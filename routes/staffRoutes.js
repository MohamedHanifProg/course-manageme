const express = require('express');
const { authenticate, authorize } = require('../controllers/authController');
const { viewAllCourses, viewAllStudents } = require('../controllers/staffController');

const router = express.Router();

// Staff-only routes
router.get('/courses', authenticate, authorize('staff'), viewAllCourses); // View all courses and registrations
router.get('/students', authenticate, authorize('staff'), viewAllStudents); // View all students

module.exports = router;
