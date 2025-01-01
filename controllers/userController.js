const bcrypt = require('bcrypt');
const User = require('../models/User');
const Student = require('../models/Student');
const Staff = require('../models/Staff');
exports.signup = async (req, res) => {
  try {
    const { username, password, role, additionalDetails } = req.body;
    if (!['Student', 'Staff'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified. Must be Student or Staff.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let referenceId;
    if (role === 'Student') {
      const { studentId, name, address, year } = additionalDetails;
      if (!studentId || !name || !address || !year) {
        return res.status(400).json({ message: 'Missing required student details' });
      }
      const student = new Student({ studentId, name, address, year });
      await student.save();
      referenceId = student._id;
    } else if (role === 'Staff') {
      const { staffId, name, address } = additionalDetails;
      if (!staffId || !name || !address) {
        return res.status(400).json({ message: 'Missing required staff details' });
      }
      const staff = new Staff({ staffId, name, address });
      await staff.save();
      referenceId = staff._id;
    }
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      referenceId
    });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
