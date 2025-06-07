import express from "express";
import { createEntry, getEntries, updateEntry, deleteEntry } from "../controllers/journalController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC_INTERFACE
router.post("/", authRequired, createEntry);
// PUBLIC_INTERFACE
router.get("/", authRequired, getEntries);
// PUBLIC_INTERFACE
router.put("/:id", authRequired, updateEntry);
// PUBLIC_INTERFACE
router.delete("/:id", authRequired, deleteEntry);

export default router;
