const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const sanitizeUser = (user) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    contactNumber: user.contactNumber,
    email: user.email,
    role: user.role,
    username: user.username,
    address: user.address,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

// ENHANCEMENT 3:
// Public SignUp working. This creates a user from the SignUp page.
// Default role is editor, because viewers are not allowed to log in.
const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      username,
      password,
      address,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !age ||
      !gender ||
      !contactNumber ||
      !email ||
      !username ||
      !password ||
      !address
    ) {
      return res.status(400).json({
        message: 'Please complete all required fields.',
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email or username already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      role: 'editor',
      username,
      password: hashedPassword,
      address,
      isActive: true,
    });

    return res.status(201).json({
      message: 'Account created successfully.',
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error.',
    });
  }
};

// ENHANCEMENT 1:
// Viewers cannot log in.
const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({
        message: 'Email/username and password are required.',
      });
    }

    const loginValue = emailOrUsername.toLowerCase();

    const user = await User.findOne({
      $or: [{ email: loginValue }, { username: loginValue }],
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid login credentials.',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: 'Your account is inactive.',
      });
    }

    if (user.role === 'viewer') {
      return res.status(403).json({
        message: 'Viewers are not allowed to log in.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid login credentials.',
      });
    }

    return res.json({
      message: 'Login successful.',
      token: createToken(user._id),
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error.',
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return res.json(users.map(sanitizeUser));
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error.',
    });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      role,
      username,
      password,
      address,
      isActive,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !age ||
      !gender ||
      !contactNumber ||
      !email ||
      !role ||
      !username ||
      !password ||
      !address
    ) {
      return res.status(400).json({
        message: 'Please complete all required fields.',
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email or username already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      role,
      username,
      password: hashedPassword,
      address,
      isActive,
    });

    return res.status(201).json(sanitizeUser(user));
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error.',
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('+password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    const {
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      role,
      username,
      password,
      address,
      isActive,
    } = req.body;

    const duplicate = await User.findOne({
      _id: { $ne: user._id },
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (duplicate) {
      return res.status(400).json({
        message: 'Email or username already exists.',
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    user.gender = gender;
    user.contactNumber = contactNumber;
    user.email = email;
    user.role = role;
    user.username = username;
    user.address = address;
    user.isActive = isActive;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    return res.json(sanitizeUser(updatedUser));
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error.',
    });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    user.isActive = !user.isActive;

    const updatedUser = await user.save();

    return res.json(sanitizeUser(updatedUser));
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error.',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
};