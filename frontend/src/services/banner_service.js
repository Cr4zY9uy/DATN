import URL from "../request/url"
import api from "../request/api";

export const addBanner = (banner) => api.post(URL.BANNER.CRUD, banner)

export const updateBanner = ({ id, ...banner }) => api.put(URL.BANNER.CRUD + `/${id}`, banner)

export const listBanner = (page, title, description, isActive, sortOrder, sortName) => api.get(URL.BANNER.CRUD, {
    params: {
        page, title, description, isActive, sortOrder, sortName
    }
})
export const detailBanner = (id) => api.get(URL.BANNER.CRUD + `/${id}`)

export const optionBanner = () => api.get(URL.BANNER.OPTIONS)

export const deleteBannerOne = (id) => api.delete(URL.BANNER.CRUD + `/${id}`)

export const deleteBannerList = (id) => api.delete(URL.BANNER.CRUD, { data: { id: id } })