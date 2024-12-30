const express = require('express');
const {
  getAllCourses,
  createCourse,
  enrollStudent,
  deleteCourse,
  updateCourse, // Import the updateCourse controller
} = require('../controllers/courseController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Get all courses (accessible to all authenticated users)
router.get('/', authenticateToken, getAllCourses);

// Create a new course (Staff only)
router.post('/', authenticateToken, authorizeRole(['Staff']), createCourse);

// Enroll a student in a course (Students only)
router.post('/enroll', authenticateToken, authorizeRole(['Student']), enrollStudent);

// Update a course (Staff only)
router.put('/:id', authenticateToken, authorizeRole(['Staff']), updateCourse);

// Delete a course (Staff only)
router.delete('/:id', authenticateToken, authorizeRole(['Staff']), deleteCourse);

module.exports = router;
