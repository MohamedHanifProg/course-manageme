const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const app = express();
app.use(express.json());
app.use(morgan('dev')); 

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.get('/', (req, res) => {
  res.status(200).send('API is running...');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
