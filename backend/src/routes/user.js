import express from "express";
import { getUser, updateUser, setPremiumRole } from "../controllers/userController.js";
import { authRequired, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC_INTERFACE
router.get("/me", authRequired, getUser);
// PUBLIC_INTERFACE
router.put("/me", authRequired, updateUser);
// PUBLIC_INTERFACE
router.post("/set-premium/:userId", requireAdmin, setPremiumRole);

export default router;
