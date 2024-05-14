import URL from "../request/url"
import api from "../request/api";
export const listProduct = (page, name, origin, categoryId, sortName, sortPrice, sortDate, start_price, end_price) => api.get(URL.PRODUCT.CRUD, {
    params: {
        page,
        name,
        origin,
        categoryId,
        sortName,
        sortPrice,
        sortDate,
        start_price,
        end_price,
    }
})

export const detailProduct = (id) => api.get(URL.PRODUCT.CRUD + `/${id}`)

export const addProduct = (data) => api.post(URL.PRODUCT.CRUD, data)

export const updateProduct = ({ id, ...data }) => api.put(URL.PRODUCT.CRUD + `/${id}`, data)


export const productByCategory = (categoryId, page) => api.get(URL.PRODUCT.CRUD, {
    params: {
        page, categoryId
    }
})

export const productMayLike = (id) => api.get(URL.PRODUCT.MAY_LIKE, {
    params: {
        id
    }
})


export const recommendProduct = (id) => api.get(URL.PRODUCT.RECOMMEND + `/${id}`)

export const detail_product_name = async (name) => {
    const url = URL.PRODUCT.DETAIL + "?name=" + name;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const add_product = async (product) => {
    const url = URL.PRODUCT.ADD;
    try {
        const rs = await api.post(url, product)
        return rs;
    }
    catch (error) {
        return error.response;
    }
}
export const edit_product = async (id, product) => {
    const url = URL.PRODUCT.EDIT + id;
    try {
        const rs = await api.put(url, product)
        return rs;
    }
    catch (error) {
        return error.response;
    }
}
export const delete_product_id = async (id) => {
    const url = URL.PRODUCT.DELETE_ID + id;
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const delete_product_all = async () => {
    const url = URL.PRODUCT.DELETE_ALL;
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const delete_product_list = async () => {
    const url = URL.PRODUCT.DELETE_LIST;
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return error.response;

    }
}


export const product_detail = async (id) => {
    const url = URL.PRODUCT.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const product_by_code = async (id, page) => {
    const url = URL.PRODUCT.BYCODE + id + "?page=" + page;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const product_by_name = async (name, page) => {
    const url = URL.PRODUCT.BYNAME + name + "?page=" + page;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;
    }
}
export const product_hot = async () => {
    const url = URL.PRODUCT.HOT
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;
    }
}
export const product_by_cate = async (name, page) => {
    const url = URL.PRODUCT.BYCATE + name + "?page=" + page;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;
    }
}

export const productAll = () => api.get(URL.PRODUCT.OPTIONS)

export const searchProduct = (searchParam, page) => api.get(URL.PRODUCT.SEARCH, {
    params: {
        searchParam, page
    }
})