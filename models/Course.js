const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  courseId: { type: Number, required: true, unique: true }, 
  courseName: { type: String, required: true },
  lecturer: { type: String, required: true },
  credits: { type: Number, required: true, min: 3, max: 5 },
  maxStudents: { type: Number, required: true },
  enrolledStudents: { type: [mongoose.Schema.Types.ObjectId], ref: 'Student', default: [] }
});

module.exports = mongoose.model('Course', courseSchema, 'courses');
