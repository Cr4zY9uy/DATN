import api from "../request/api";
import URL from "../request/url";

export const addFavourite = (productId) => api.post(URL.FAVOURITE, { productId: productId })

export const deleteFavourite = (productId) => api.delete(URL.FAVOURITE, { data: { productId: productId } })

export const getFavourite = () => api.get(URL.FAVOURITE)
