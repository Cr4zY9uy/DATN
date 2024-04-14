import { Router } from "express";
import { getChatroomDetail, getChatrooms, sendMessage } from '../controllers/chat_controller.js'
import { checkAuth } from "../middleware/check_auth.js";

const router = Router();


router.post("/chat", checkAuth, sendMessage);

router.get("/chat", getChatrooms);
router.get("/chat/:roomId", getChatroomDetail);


export default router;