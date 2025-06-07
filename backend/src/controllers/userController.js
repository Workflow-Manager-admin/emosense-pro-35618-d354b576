import User from "../models/User.js";

// PUBLIC_INTERFACE
export const getUser = async (req, res) => {
  res.json({
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    premiumUntil: req.user.premiumUntil,
  });
};

// PUBLIC_INTERFACE
export const updateUser = async (req, res) => {
  const { name } = req.body;
  req.user.name = name || req.user.name;
  await req.user.save();
  res.json({ message: "Profile updated." });
};

// PUBLIC_INTERFACE
export const setPremiumRole = async (req, res) => {
  // Only admin can set role
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found." });
  user.role = "premium";
  await user.save();
  res.json({ message: "User upgraded to premium." });
};
