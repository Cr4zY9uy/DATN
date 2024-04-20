import URL from "../request/url"
import api from "../request/api"

export const login = (user) => api.post(URL.USER.LOGIN, user)


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


export const register = (user) => api.post(URL.USER.REGISTER, user);

export const forgetPassword = (email) => api.post(URL.USER.FORGOT, email);

export const resetPassword = (data) => api.put(URL.USER.RESET, data)

export const logout = () => api.post(URL.USER.LOGOUT)
