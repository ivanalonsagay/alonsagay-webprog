const express = require('express');

// import functions
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:id').put(updateUser).delete(deleteUser);

router.post('/login', loginUser);

// Keep this only if your frontend SignUp page still uses /api/users/register
router.post('/register', createUser);

module.exports = router;