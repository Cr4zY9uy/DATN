import { Router } from "express";
import { getChatroomDetail, getChatrooms, sendMessage } from '../controllers/chat_controller.js'
import { authRole, checkAuth } from "../middleware/check_auth.js";
import { create_validator } from "../validator/chat_validator.js";

const router = Router();


router.post("/chat", checkAuth, authRole([0, 1]), create_validator, sendMessage);

router.get("/chat", checkAuth, authRole([0, 1]), getChatrooms);
router.get("/chat/:roomId", checkAuth, authRole([0, 1]), getChatroomDetail);


export default router;