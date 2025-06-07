import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";
import journalRoutes from "./routes/journal.js";
import moodRoutes from "./routes/mood.js";
import aiRoutes from "./routes/ai.js";
import exportRoutes from "./routes/export.js";
import premiumRoutes from "./routes/premium.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

// Seed demo user in development if .env DEMO_USER_ON_BOOT is set or always during development for demo
if (process.env.NODE_ENV !== "production") {
  import("./seedDemoUser.js").then(mod => mod.default && mod.default()).catch(() => {});
}

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("MoodTrack Pro API 🟢"));

app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/premium", premiumRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`MoodTrack Pro backend running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
