import { cloudinary, options } from "../cloudinary/cloudinary.js"
import DatauriParser from "datauri/parser.js";

const parser = new DatauriParser();


export const upload_image = async (req, res) => {
    const images = req.files
    try {
        const imagesToUpload = images.map((image) =>
            cloudinary.uploader.upload(parser.format(image.originalname.toString(), image.buffer).content, options)
        );
        const result = await Promise.all(imagesToUpload);
        const imageUrls = result.map((item) => ({
            url: item.url
        }))
        return res.status(200).json({ images: imageUrls })
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

