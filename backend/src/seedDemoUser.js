import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";

dotenv.config();

async function seedDemoUser() {
  const DEMO_EMAIL = "123@demo.com";
  const DEMO_NAME = "Demo User";
  const DEMO_PASSWORD = "123";

  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    let user = await User.findOne({ email: DEMO_EMAIL });
    if (!user) {
      const hashed = await bcrypt.hash(DEMO_PASSWORD, 10);
      user = new User({ email: DEMO_EMAIL, password: hashed, name: DEMO_NAME, role: "premium" });
      await user.save();
      console.log("Demo user seeded.");
    } else {
      console.log("Demo user already exists.");
    }
    process.exit(0);
  } catch (err) {
    console.error("Error seeding demo user:", err);
    process.exit(1);
  }
}

seedDemoUser();
