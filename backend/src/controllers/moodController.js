import Mood from "../models/Mood.js";

// PUBLIC_INTERFACE
export const createMood = async (req, res) => {
  try {
    const { emoji, score, note } = req.body;
    const date = new Date();
    const existing = await Mood.findOne({ user: req.user._id, date: { $gte: new Date(date.setHours(0,0,0,0)), $lt: new Date(date.setHours(23,59,59,999)) }});
    if (existing) return res.status(409).json({ error: "Mood already logged today" });
    const mood = new Mood({ user: req.user._id, emoji, score, note });
    await mood.save();
    res.json(mood);
  } catch (err) {
    res.status(400).json({ error: "Error creating mood log" });
  }
};

// PUBLIC_INTERFACE
export const getMoods = async (req, res) => {
  const moods = await Mood.find({ user: req.user._id }).sort({ date: -1 });
  res.json(moods);
};

// PUBLIC_INTERFACE
export const updateMood = async (req, res) => {
  const { id } = req.params;
  const { emoji, score, note } = req.body;
  const mood = await Mood.findOneAndUpdate({ _id: id, user: req.user._id }, { emoji, score, note }, { new: true });
  if (!mood) return res.status(404).json({ error: "Mood not found" });
  res.json(mood);
};

// PUBLIC_INTERFACE
export const deleteMood = async (req, res) => {
  const { id } = req.params;
  const mood = await Mood.findOneAndDelete({ _id: id, user: req.user._id });
  if (!mood) return res.status(404).json({ error: "Mood not found" });
  res.json({ message: "Mood deleted" });
};
