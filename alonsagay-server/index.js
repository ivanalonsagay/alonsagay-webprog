import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'Ivanka API is running',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is healthy',
  });
});

app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});