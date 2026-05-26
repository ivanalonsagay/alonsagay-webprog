const express = require('express');

const {
  registerUser,
  loginUser,
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
} = require('../controllers/userController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', protect, adminOnly, getUsers);
router.post('/', protect, adminOnly, createUser);
router.put('/:id', protect, adminOnly, updateUser);
router.patch('/:id/status', protect, adminOnly, toggleUserStatus);

module.exports = router;