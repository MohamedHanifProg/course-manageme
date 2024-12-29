const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.models.Staff || mongoose.model('Staff', staffSchema);
