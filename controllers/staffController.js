const Staff = require('../models/Staff');

// Add a new staff member
exports.addStaff = async (req, res) => {
  try {
    const { staffId, staffName, address } = req.body;
    const staff = new Staff({ staffId, staffName, address });
    await staff.save();
    res.status(201).json({ message: 'Staff member added successfully', staff });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add staff member', details: error.message });
  }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.status(200).json(staffMembers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve staff members', details: error.message });
  }
};

// Update a staff member
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!staff) return res.status(404).json({ error: 'Staff member not found' });
    res.status(200).json({ message: 'Staff member updated successfully', staff });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update staff member', details: error.message });
  }
};

// Delete a staff member
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ error: 'Staff member not found' });
    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete staff member', details: error.message });
  }
};
