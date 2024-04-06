import cloudinary from "./cloudinary.js"
import { Router } from "express";
const router = Router();

const upload_image = async (req, res) => {
    const options = {
        upload_preset: process.env.UPLOAD_PRESET
    };
    try {
        const result = await cloudinary.uploader.upload(req.imagePath, options);
        return res.status(200).json({ public_id: result.public_id });
    } catch (error) {
        throw new Error(`Failed to upload image to Cloudinary: ${error}`);
    }
};
router.post("/upload_image", upload_image)

export { router, upload_image };