import express from "express";
import {
  createMood,
  getMoods,
  updateMood,
  deleteMood,
} from "../controllers/moodController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC_INTERFACE
router.post("/", authRequired, createMood);
// PUBLIC_INTERFACE
router.get("/", authRequired, getMoods);
// PUBLIC_INTERFACE
router.put("/:id", authRequired, updateMood);
// PUBLIC_INTERFACE
router.delete("/:id", authRequired, deleteMood);

export default router;
