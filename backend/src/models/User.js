import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    role: { type: String, enum: ["free", "premium", "admin"], default: "free" },
    googleId: { type: String },
    createdAt: { type: Date, default: Date.now },
    premiumUntil: { type: Date },
    // Add any settings, backup pointers etc here.
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
