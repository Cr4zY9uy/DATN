import { v2 as cloudinary } from "cloudinary"
import * as dotenv from "dotenv"
dotenv.config();
cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});
export default cloudinary;