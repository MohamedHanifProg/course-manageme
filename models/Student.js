const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    min: 1 // Assuming a minimum of 1st-year students
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course' // Referencing the Course model
    }
  ]
});

module.exports = mongoose.model('Student', studentSchema);
