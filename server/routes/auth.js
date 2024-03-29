import express from 'express';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  uploadImage,
  updatePassword,
} from '../controllers/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({
    data: 'hello from server',
  });
});

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/upload-image', uploadImage);
router.post('/update-password', updatePassword);

export default router;
