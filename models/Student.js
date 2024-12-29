const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    address: { type: String, required: true },
    academicYear: { type: Number, required: true }
  });
  
  module.exports = mongoose.model('Student', studentSchema);