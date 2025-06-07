import express from "express";
import { premiumAnalytics, calendarSync, cloudBackup } from "../controllers/premiumController.js";
import { requirePremium } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC_INTERFACE
router.get("/analytics", requirePremium, premiumAnalytics);
// PUBLIC_INTERFACE
router.post("/calendar-sync", requirePremium, calendarSync);
// PUBLIC_INTERFACE
router.post("/cloud-backup", requirePremium, cloudBackup);

export default router;
