const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Alonsagay Lab Act 7 API is running.');
});

app.use('/api/users', userRoutes);

const createDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({
    username: 'admin',
  });

  if (existingAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  await User.create({
    firstName: 'System',
    lastName: 'Admin',
    age: 25,
    gender: 'other',
    contactNumber: '09123456789',
    email: 'admin@ivanka.com',
    role: 'admin',
    username: 'admin',
    password: hashedPassword,
    address: 'Sampaloc, Manila',
    isActive: true,
  });

  console.log('Default admin created: admin / Admin123!');
};

const startServer = async () => {
  await connectDB();
  await createDefaultAdmin();

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();