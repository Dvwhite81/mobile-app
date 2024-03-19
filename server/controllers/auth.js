import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/user.js';
import { hashPassword, comparePassword } from '../utils/auth.js';

import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

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
  console.log('email:', email);
  const user = await User.findOne({ email });
  console.log('user:', user);
  if (!user) {
    return res.json({ error: 'User not found' });
  }

  const resetCode = nanoid(5).toUpperCase();
  console.log('resetCode:', resetCode);
  user.resetCode = resetCode;
  user.save();
  console.log('api_key:', process.env.API_KEY);
  console.log('email_from:', process.env.EMAIL_FROM);
  const mailersend = new MailerSend({
    apiKey: process.env.API_KEY,
  });

  const sender = new Sender(process.env.EMAIL_FROM, 'Management');
  const recipients = [new Recipient(user.email, 'Recipient')];

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipients)
    .setSubject('Password reset code')
    .setHtml(`<h1>Your password reset code is ${resetCode}</h1>`)
    .setText(`Your password reset code is ${resetCode}`);

  try {
    const data = await mailersend.email.send(emailParams);
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

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: nanoid(),
      resource_type: 'jpg',
    });

    console.log('uploadImage result:', result);

    const user = await User.findByIdAndUpdate(
      req.body.user._id,
      {
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      },
      { new: true }
    );

    console.log('uploadImage user:', user);

    return res.json({
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 4) {
      return res.json({
        error: 'Password is required and must be at least 4 characters',
      });
    } else {
      const hashedPassword = await hashPassword(password);
      const user = await User.findByIdAndUpdate(req.body.user.user._id, {
        password: hashedPassword,
      });

      user.password = undefined;
      user.secret = undefined;
      return res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
};
