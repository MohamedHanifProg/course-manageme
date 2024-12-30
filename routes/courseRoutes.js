const express = require('express');
const {
    getAllCourses,
    createCourse,
    enrollStudent,
    unenrollStudent,
    deleteCourse,
    updateCourse,
     updateEnrollment,
     getCourseRegistrationStatus
} = require('../controllers/courseController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Get all courses (accessible to all authenticated users)
router.get('/', authenticateToken, getAllCourses);

// Create a new course (Staff only)
router.post('/', authenticateToken, authorizeRole(['Staff']), createCourse);

// Enroll a student in a course (Students only)
router.post('/enroll', authenticateToken, authorizeRole(['Student']), enrollStudent);

// Unenroll a student from a course (Students only)
router.delete('/unenroll/:id', authenticateToken, authorizeRole(['Student']), unenrollStudent);

router.put('/swap', authenticateToken, authorizeRole(['Student']), updateEnrollment);
// Update a course (Staff only)
router.put('/:id', authenticateToken, authorizeRole(['Staff']), updateCourse);

// Delete a course (Staff only)
router.delete('/:id', authenticateToken, authorizeRole(['Staff']), deleteCourse);



router.get('/status/:id', authenticateToken, authorizeRole(['Staff']), getCourseRegistrationStatus);



module.exports = router;
