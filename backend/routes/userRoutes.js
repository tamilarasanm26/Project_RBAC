const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route for Admin
router.get('/admin', protect, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

// Protected route for Moderator
router.get('/moderator', protect, authorize(['moderator', 'admin']), (req, res) => {
  res.json({ message: 'Welcome Moderator!' });
});

// Protected route for User
router.get('/user', protect, authorize(['user', 'moderator', 'admin']), (req, res) => {
  res.json({ message: 'Welcome User!' });
});

module.exports = router;
