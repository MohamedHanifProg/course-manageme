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
router.get('/', authenticateToken, getAllCourses);
router.post('/', authenticateToken, authorizeRole(['Staff']), createCourse);
router.post('/enroll', authenticateToken, authorizeRole(['Student']), enrollStudent);
router.delete('/unenroll/:id', authenticateToken, authorizeRole(['Student']), unenrollStudent);
router.put('/swap', authenticateToken, authorizeRole(['Student']), updateEnrollment);
router.put('/:id', authenticateToken, authorizeRole(['Staff']), updateCourse);
router.delete('/:id', authenticateToken, authorizeRole(['Staff']), deleteCourse);
router.get('/status/:id', authenticateToken, authorizeRole(['Staff']), getCourseRegistrationStatus);
module.exports = router;
