import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    aiSentiment: { type: String }, // happy, sad, anxious etc.
    aiScores: {
      joy: Number,
      sadness: Number,
      anger: Number,
      anxiety: Number,
      [String]: Number, // extendable
    },
  },
  { timestamps: true }
);

export default mongoose.model("JournalEntry", journalSchema);
