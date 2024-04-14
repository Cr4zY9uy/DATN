import cloudinary from "./cloudinary.js"
import { Router } from "express";

const router = Router();
import DatauriParser from "datauri/parser.js";
const parser = new DatauriParser();
const options = {
    upload_preset: process.env.UPLOAD_PRESET
};

const upload_image = async (req, res) => {
    const images = req.files
    try {
        const imagesToUpload = images.map((image) =>
            cloudinary.uploader.upload(parser.format(image.originalname.toString(), image.buffer).content, options)
        );
        const result = await Promise.all(imagesToUpload);
        const imageUrls = result.map((item) => ({
            public_id: item.public_id,
            url: item.url
        }))
        return res.status(200).json({ images: imageUrls })
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
router.post("/upload_image", upload_image)

export { router, upload_image };