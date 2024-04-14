import URL from "../request/url"
import api from "../request/api"

export const login = async (user) => {
    const url = URL.USER.LOGIN;
    try {
        const rs = await api.post(url, user)
        return rs;
    }
    catch (error) {
        return error.response;
    }
}

export const logout = async () => {
    const url = URL.USER.LOGOUT;
    try {
        const rs = await api.post(url)
        return rs;
    }
    catch (error) {
        return error.response;
    }
}
export const refreshAccessToken = async () => {
    const url = URL.USER.REFRESH_ACCESS_TOKEN;
    try {
        const rs = await api.post(url);
        return rs;
    } catch (error) {
        return error.response;
    }
}
export const refreshToken = async () => {
    const url = URL.USER.REFRESH_TOKEN;
    try {
        const rs = await api.post(url);
        return rs;

    } catch (error) {
        return error.response;
    }
}


export const loginByGoogle = async () => {
    try {
        const rs = await api.get(URL.USER.GOOGLE);
        return rs;

    } catch (error) {
        return error.response;
    }
}



