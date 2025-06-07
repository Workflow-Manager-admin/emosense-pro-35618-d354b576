import express from "express";
import { exportCSV, exportPDF } from "../controllers/exportController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC_INTERFACE
router.get("/csv", authRequired, exportCSV);
// PUBLIC_INTERFACE
router.get("/pdf", authRequired, exportPDF);

export default router;
