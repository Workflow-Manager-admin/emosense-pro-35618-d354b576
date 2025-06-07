import express from "express";
import { analyzeJournalEntry } from "../controllers/aiController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC_INTERFACE
router.post("/analyze", authRequired, analyzeJournalEntry);

export default router;
