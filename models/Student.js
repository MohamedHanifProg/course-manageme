const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  studentId: { type: Number, required: true, unique: true }, // Change to Number
  name: { type: String, required: true },
  address: { type: String, required: true },
  year: { type: Number, required: true },
  enrolledCourses: { type: [mongoose.Schema.Types.ObjectId], ref: 'Course', default: [] }
});

module.exports = mongoose.model('Student', studentSchema, 'students');
