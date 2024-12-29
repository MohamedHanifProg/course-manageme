const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true }, // Unique identifier for the course
  courseName: { type: String, required: true }, // Name of the course
  lecturer: { type: String, required: true }, // Lecturer name
  creditPoints: { type: Number, required: true, min: 3, max: 5 }, // Credit points (3-5)
  maxStudents: { type: Number, required: true }, // Maximum allowed students
  students: [
    {
      studentId: { type: String, required: true }, // Reference to the student's ID
      studentName: { type: String, required: true }, // Student's name
      enrollmentDate: { type: Date, default: Date.now } // Enrollment date
    }
  ]
});

module.exports = mongoose.model('Course', courseSchema);
