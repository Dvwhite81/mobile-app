import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Link = mongoose.model('Link', linkSchema);

export default Link;
