import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// PUBLIC_INTERFACE
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ error: "Email already in use." });
    const hashed = await bcrypt.hash(password, 10);
    user = new User({ email, name, password: hashed });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: "Registration failed." });
  }
};

// PUBLIC_INTERFACE
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(401).json({ error: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: "Login failed." });
  }
};

// PUBLIC_INTERFACE
export const googleOAuth = async (req, res) => {
  // (This would process OAuth callback, use Auth0/Firebase externally in production)
  res.status(501).json({ message: "OAuth endpoint (use Auth0/Firebase client SDK)" });
};
