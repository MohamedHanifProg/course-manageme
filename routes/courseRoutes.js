const express = require('express');
const { authenticate, authorize } = require('../controllers/authController');
const { addCourse, getAllCourses, updateCourse, deleteCourse, getCourseDetails } = require('../controllers/courseController');

const router = express.Router();

// Public route: Students and staff can view courses
router.get('/', authenticate, getAllCourses);

// Staff-only routes
router.post('/', authenticate, authorize('staff'), addCourse); // Add a course
router.put('/:id', authenticate, authorize('staff'), updateCourse); // Edit a course
router.delete('/:id', authenticate, authorize('staff'), deleteCourse); // Delete a course
router.get('/:id/details', authenticate, authorize('staff'), getCourseDetails); // View course registration details

module.exports = router;
