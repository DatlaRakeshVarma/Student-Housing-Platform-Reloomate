const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Protected routes - require authentication
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;