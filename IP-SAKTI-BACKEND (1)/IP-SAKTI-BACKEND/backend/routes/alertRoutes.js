import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { listAlerts, markRead } from "../controllers/alertController.js";

const router = Router();

router.use(protect);
router.get("/", listAlerts);
router.patch("/:id/read", markRead);

export default router;
