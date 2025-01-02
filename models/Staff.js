const mongoose = require('mongoose');
const staffSchema = new mongoose.Schema({
  staffId: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true }
});
module.exports = mongoose.model('Staff', staffSchema, 'staff-collection');
