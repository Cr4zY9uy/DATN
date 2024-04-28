import URL from "../request/url"
import api from "../request/api";
export const list_room = async () => {
    const url = URL.CHAT.CRUD;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;
    }
}

export const detail_room = async (id) => {
    const url = URL.CHAT.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;
    }
}

export const send_message = async (message) => {
    const url = URL.CHAT.CRUD;
    try {
        const rs = await api.post(url, message)
        return rs;
    }
    catch (error) {
        return error.response;
    }
}
