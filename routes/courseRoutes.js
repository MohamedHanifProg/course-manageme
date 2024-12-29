const express = require('express');
const {
  addCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const router = express.Router();

router.post('/', addCourse); // Add a new course
router.get('/', getAllCourses); // Get all courses
router.put('/:id', updateCourse); // Update a course
router.delete('/:id', deleteCourse); // Delete a course

module.exports = router;
