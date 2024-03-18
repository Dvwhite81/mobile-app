import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 4,
      max: 64,
    },
    resetCode: {
      type: String,
      defaultValue: '',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;