import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import myHotelsRoutes from './routes/my-hotels';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
  // .then(() => {
  //   console.log('Connected to database: ', process.env.MONGODB_CONNECTION_STRING);
  // });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/my-hotels', myHotelsRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
