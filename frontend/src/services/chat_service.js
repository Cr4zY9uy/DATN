import URL from "../request/url"
import api from "../request/api";

export const list_room = () => api.get(URL.CHAT.CRUD)

export const detail_room = (id) => api.get(URL.CHAT.CRUD + `/${id}`)

export const send_message = (message) => api.post(URL.CHAT.CRUD, message)


