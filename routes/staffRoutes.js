const express = require('express');
const {
    addStaff,
    getAllStaff,
    updateStaff,
    deleteStaff,
} = require('../controllers/staffController');
const router = express.Router();

router.post('/', addStaff); // Add a new staff member
router.get('/', getAllStaff); // Get all staff members
router.put('/:id', updateStaff); // Update a staff member
router.delete('/:id', deleteStaff); // Delete a staff member

module.exports = router;
