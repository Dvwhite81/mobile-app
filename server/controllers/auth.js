import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/user.js';
import { hashPassword, comparePassword } from '../utils/auth.js';

import { EmailParams, MailerSend, Recipient } from 'mailersend';

export const register = async (req, res) => {
  console.log('Register Hit');

  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.json({ error: 'Name is required' });
    }
    if (!email) {
      return res.json({ error: 'Email is required' });
    }
    if (!password || password.length < 4) {
      return res.json({
        error: 'Password is required and must be at least 4 characters',
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ error: 'Email is taken' });
    }

    const hashedPassword = await hashPassword(password);

    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      const { password, ...rest } = user._doc;
      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: 'No user found' });
    }

    const matchingPassword = await comparePassword(password, user.password);

    if (!matchingPassword) {
      return res.json({ error: 'Wrong password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    user.password = undefined;
    user.secret = undefined;

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error. Try again.');
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ error: 'User not found' });
  }

  const resetCode = nanoid(5).toUpperCase();

  user.resetCode = resetCode;
  user.save();

  const mailersend = new MailerSend({
    api_key: process.env.API_KEY,
  });

  const recipients = [new Recipient(user.email, 'Recipient')];

  const emailParams = new EmailParams()
    .setFrom(process.env.EMAIL_FROM)
    .setRecipients(recipients)
    .setSubject('Password reset code')
    .setHtml(`Your password reset code is ${resetCode}`)
    .setText(`Your password reset code is ${resetCode}`);

  try {
    const data = await mailersend.send(emailParams);
    console.log('data:', data);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.json({ ok: false });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body;

    const user = await User.findOne({ email, resetCode });

    if (!user) {
      return res.json({ error: 'Invalid email or reset code' });
    }

    if (!password || password.length < 4) {
      return res.json({
        error: 'Password is required and must be at least 4 characters',
      });
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetCode = '';
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.json({ ok: false });
  }
};
