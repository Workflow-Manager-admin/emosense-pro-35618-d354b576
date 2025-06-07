import express from "express";
import { register, login, googleOAuth } from "../controllers/authController.js";

const router = express.Router();

// PUBLIC_INTERFACE
router.post("/register", register);
// PUBLIC_INTERFACE
router.post("/login", login);
// PUBLIC_INTERFACE
router.post("/oauth/google", googleOAuth);

export default router;
