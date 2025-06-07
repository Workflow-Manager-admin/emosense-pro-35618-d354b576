import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    emoji: { type: String },
    score: { type: Number },
    note: { type: String },
    recommendations: [String], // from AI or rules
  },
  { timestamps: true }
);

export default mongoose.model("Mood", moodSchema);
