import URL from "../request/url"
import api from "../request/api";

export const addBlog = (blog) => api.post(URL.BLOG.CRUD, blog)

export const updateBlog = ({ id, ...blog }) => api.put(URL.BLOG.CRUD + `/${id}`, blog)

export const listBlog = (page, title, isActive, sortOrder, sortTitle) => api.get(URL.BLOG.CRUD, {
    params: {
        page, title, isActive, sortOrder, sortTitle
    }
})
export const detailBlog = (id) => api.get(URL.BLOG.CRUD + `/${id}`)


export const deleteBlogOne = (id) => api.delete(URL.BLOG.CRUD + `/${id}`)

export const deleteBlogList = (id) => api.delete(URL.BLOG.CRUD, { data: { id: id } })