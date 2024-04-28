import URL from "../request/url"
import api from "../request/api";

export const addCategory = (category) => api.post(URL.CATEGORY.CRUD, category)

export const updateCategory = ({ id, ...category }) => api.put(URL.CATEGORY.CRUD + `/${id}`, category)

export const listCategory = (page, name, description, isActive, sortOrder, sortName) => api.get(URL.CATEGORY.CRUD, {
    params: {
        page, name, description, isActive, sortOrder, sortName
    }
})
export const detailCategory = (id) => api.get(URL.CATEGORY.CRUD + `/${id}`)

export const optionCategory = () => api.get(URL.CATEGORY.OPTIONS)

export const deleteCategoryOne = (id) => api.delete(URL.CATEGORY.CRUD + `/${id}`)

export const deleteCategoryList = (id) => api.delete(URL.CATEGORY.CRUD, { data: { id: id } })