import JournalEntry from "../models/JournalEntry.js";
import Mood from "../models/Mood.js";

// Utils toCSV, toPDF omitted for brevity (implement as needed)
function toCSV(data) {
  const keys = Object.keys(data[0] || {});
  const csvRows = [keys.join(",")];
  data.forEach(row => {
    csvRows.push(keys.map(k => JSON.stringify(row[k] || "")).join(","));
  });
  return csvRows.join("\n");
}

// PUBLIC_INTERFACE
export const exportCSV = async (req, res) => {
  const moods = await Mood.find({ user: req.user._id }).lean();
  const journals = await JournalEntry.find({ user: req.user._id }).lean();
  const data = [
    { section: "MoodLogs", logs: moods },
    { section: "Journals", entries: journals }
  ];
  res.header("Content-Type", "text/csv");
  res.attachment("moodtrack_export.csv");
  res.send(toCSV([...moods, ...journals]));
};

// PUBLIC_INTERFACE
export const exportPDF = async (req, res) => {
  res.status(501).json({ error: "PDF export not implemented in stub." });
};
