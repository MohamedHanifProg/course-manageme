const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true }, // Unique identifier for the staff member
  staffName: { type: String, required: true }, // Staff member's name
  address: { type: String, required: true } // Staff member's address
});

module.exports = mongoose.model('Staff', staffSchema);
