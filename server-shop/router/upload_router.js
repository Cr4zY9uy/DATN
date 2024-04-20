import { Router } from "express";
import { upload_image } from "../controllers/upload_controller.js";

const router = Router();

router.post("/upload_image", upload_image)


export default router;