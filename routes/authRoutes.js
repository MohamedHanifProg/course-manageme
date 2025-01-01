const express = require('express');
const { login } = require('../controllers/authController');
const { signup } = require('../controllers/userController');
const router = express.Router();
router.post('/signup', signup); 
router.post('/login', login);   
module.exports = router;
