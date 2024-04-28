import api from "../request/api";
import URL from "../request/url";

export const uploadImage = (image) => api.post(URL.UPLOAD, image, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})