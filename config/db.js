const mongoose = require('mongoose');
const consts = require('../constants');
const { DB_HOST, DB_USER, DB_PASSWORD } = consts;
const url = DB_HOST;
const options = {
  user: DB_USER,
  pass: DB_PASSWORD
};
const connectDB = async () => {
  try {
    await mongoose.connect(url, options);
    console.log('Connected to DB');
  } catch (err) {
    console.log(`Connection error: ${err.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
