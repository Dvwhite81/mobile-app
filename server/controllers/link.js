import Link from '../models/link.js';

export const postLink = async (req, res) => {
  try {
    const link = await new Link({ ...req.body }).save();
    res.json(link);
  } catch (error) {
    console.log(error);
  }
};

export const links = async (req, res) => {
  try {
    const all = await Link.find().sort({ createdAt: -1 }).limit(500);
    res.json(all);
  } catch (error) {
    console.log(error);
  }
};

export const viewCount = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.params.linkId,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};
