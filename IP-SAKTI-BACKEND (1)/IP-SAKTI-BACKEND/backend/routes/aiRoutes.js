import { Router } from "express";
import {
  search,
  assess,
  generatePassport,
  chat,
  listPassports,
  getPassport
} from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";
import { aiLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.use(protect, aiLimiter);

router.post("/search", search);
router.post("/assess", assess);
router.post("/passport", generatePassport);
router.post("/chat", chat);

router.get("/passports", listPassports);
router.get("/passports/:id", getPassport);

export default router;
