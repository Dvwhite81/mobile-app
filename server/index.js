import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();


import authRoutes from './routes/auth.js';

const app = express();

const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT;

mongoose
  .connect(DATABASE)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Connection Error: ', err));

app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
