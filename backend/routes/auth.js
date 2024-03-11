import express from 'express';
import {
  login,
  signup,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
  return res.json({
    data: 'Hello from api',
  });
});

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);

export default authRouter;
