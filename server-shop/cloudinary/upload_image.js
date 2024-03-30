import cloudinary from "./cloudinary.js"
const upload_image = async (imagePath) => {
    const options = {

        upload_preset: process.env.UPLOAD_PRESET
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        return result.public_id;
    } catch (error) {
        throw new Error(`Failed to upload image to Cloudinary: ${error}`);
    }
};
export default upload_image;