import { Router } from "express";
import { protect } from "../middleware/auth.js";
import {
  listChats,
  getChat,
  createChat,
  deleteChat
} from "../controllers/chatController.js";

const router = Router();

router.use(protect);

router.get("/", listChats);
router.post("/", createChat);
router.get("/:id", getChat);
router.delete("/:id", deleteChat);

export default router;
