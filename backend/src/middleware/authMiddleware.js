import jwt from "jsonwebtoken";
import User from "../models/User.js";

// PUBLIC_INTERFACE
export const authRequired = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Auth required" });
  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) throw new Error("User not found");
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// PUBLIC_INTERFACE
export const requirePremium = (req, res, next) => {
  if (req.user && req.user.role === "premium") return next();
  return res.status(403).json({ error: "Premium access required" });
};

// PUBLIC_INTERFACE
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ error: "Admin access required" });
};
