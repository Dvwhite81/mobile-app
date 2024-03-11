import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
dotenv.config();

import authRouter from './routes/auth.js';

const app = express();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Connection Error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api', authRouter);

app.listen(8000, () => console.log('Server running on port 8000'));
