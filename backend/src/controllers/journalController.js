import JournalEntry from "../models/JournalEntry.js";

// PUBLIC_INTERFACE
export const createEntry = async (req, res) => {
  const { content, aiSentiment, aiScores } = req.body;
  const entry = new JournalEntry({ user: req.user._id, content, aiSentiment, aiScores });
  await entry.save();
  res.json(entry);
};

// PUBLIC_INTERFACE
export const getEntries = async (req, res) => {
  const entries = await JournalEntry.find({ user: req.user._id }).sort({ date: -1 });
  res.json(entries);
};

// PUBLIC_INTERFACE
export const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { content, aiSentiment, aiScores } = req.body;
  const entry = await JournalEntry.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { content, aiSentiment, aiScores },
    { new: true }
  );
  if (!entry) return res.status(404).json({ error: "Entry not found" });
  res.json(entry);
};

// PUBLIC_INTERFACE
export const deleteEntry = async (req, res) => {
  const { id } = req.params;
  const entry = await JournalEntry.findOneAndDelete({ _id: id, user: req.user._id });
  if (!entry) return res.status(404).json({ error: "Entry not found" });
  res.json({ message: "Entry deleted" });
};
