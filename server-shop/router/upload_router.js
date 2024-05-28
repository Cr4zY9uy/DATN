import { Router } from "express";
import { upload_image } from "../controllers/upload_controller.js";
import { authRole, checkAuth } from "../middleware/check_auth.js";

const router = Router();

router.post("/upload_image", checkAuth, authRole([0, 2, 3]), upload_image)


export default router;