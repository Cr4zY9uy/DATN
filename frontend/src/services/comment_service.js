import api from "../request/api";
import URL from "../request/url";

export const addComment = (data) => api.post(URL.COMMENT.CRUD, data)

export const updateComment = ({ id, ...data }) => api.put(URL.COMMENT.CRUD + `/${id}`, data)

export const paginateComment = (page, sortDate, isActive, name) => api.get(URL.COMMENT.CRUD, {
    params: {
        page, sortDate, isActive, name
    }
})

export const detailComment = (id) => api.get(URL.COMMENT.CRUD + `/${id}`)

export const commentOfProduct = (productId, page, name, sortDate, isActive) => api.get(URL.COMMENT.PRODUCT_PAGINATE + `/${productId}`, {
    params: {
        page, name, sortDate, isActive

    }
})

export const commentOfProductAll = (productId) => api.get(URL.COMMENT.PRODUCT, {
    params: {
        productId
    }
})