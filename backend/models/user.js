import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema(
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
    role: {
      type: String,
      default: 'Subscriber',
    },
    image: {
      public_id: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: '',
      },
    },
    resetCode: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
