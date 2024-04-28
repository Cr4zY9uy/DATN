import URL from "../request/url"
import api from "../request/api";

export const createBill = (info) => api.post(URL.PAYMENT, info)
