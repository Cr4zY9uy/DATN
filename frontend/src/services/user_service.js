import URL from "../request/url"
import api from "../request/api"

export const login = (user) => api.post(URL.USER.LOGIN, user)

export const getMe = () => api.get(URL.USER.GET_ME)

export const register = (user) => api.post(URL.USER.REGISTER, user);

export const forgetPassword = (email) => api.post(URL.USER.FORGOT, email);

export const resetPassword = (data) => api.put(URL.USER.RESET, data)

export const logout = () => api.post(URL.USER.LOGOUT)


export const loginByGoogle = () => api.get(URL.USER.LOGIN_GOOGLE)


export const logoutGoogle = () => api.post(URL.USER.LOGOUT_GOOGLE)

export const updateUser = ({ id, ...data }) => api.put(URL.USER.CRUD + `/${id}`, data)

export const resetPasswordCurrentUser = (data) => api.put(URL.USER.RESET_PASSWORD_CURRENT, data)