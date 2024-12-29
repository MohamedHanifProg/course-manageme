const express = require('express');
const { authenticate, authorize } = require('../controllers/authController');
const { enrollCourse, dropCourse, getMyCourses } = require('../controllers/studentController');

const router = express.Router();

// Student-only routes
router.post('/enroll', authenticate, authorize('student'), enrollCourse); // Enroll in a course
router.delete('/drop/:id', authenticate, authorize('student'), dropCourse); // Drop a course
router.get('/my-courses', authenticate, authorize('student'), getMyCourses); // View enrolled courses

module.exports = router;
