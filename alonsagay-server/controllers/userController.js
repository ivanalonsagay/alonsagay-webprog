const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sanitizeUser = (user) => {
  const userObject = user.toObject ? user.toObject() : user;

  delete userObject.password;

  userObject.id = userObject._id;

  return userObject;
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json(sanitizeUser(user));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Email or username already exists',
      });
    }

    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Email or username already exists',
      });
    }

    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, username, emailOrUsername, password } = req.body;

    const loginValue = email || username || emailOrUsername;

    if (!loginValue || !password) {
      return res.status(400).json({
        message: 'Email/username and password are required',
      });
    }

    const user = await User.findOne({
      $or: [
        { email: loginValue.toLowerCase() },
        { username: loginValue.toLowerCase() },
      ],
    }).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: 'Your account is inactive. Please contact support.',
      });
    }

    if (user.role === 'viewer') {
      return res.status(403).json({
        message: 'Viewers are not allowed to log in.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.json({
      message: 'Login successful',
      token,
      role: user.role,
      firstName: user.firstName,
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};