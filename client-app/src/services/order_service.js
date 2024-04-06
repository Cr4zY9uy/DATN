import URL from "./url"
import api from "./api";

export const list_order = async (page) => {
    const url = URL.ORDER.PAGINATE + "?page=" + page;
    try {
        const rs = await api.get(url)
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const detail_order = async (id) => {
    const url = URL.ORDER.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;
    }
}

export const edit_order = async (id, order) => {
    const url = URL.ORDER.EDIT + id;
    try {
        const rs = await api.put(url, order)
        return rs;
    }
    catch (error) {
        return error.response;
    }

}
export const delete_order_id = async (id) => {
    const url = URL.ORDER.DELETE_ID + id;
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return error.response;
    }

}
export const delete_order_all = async () => {
    const url = URL.ORDER.DELETE_ALL;
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return error.response;
    }

}

export const delete_order_list = async () => {
    const url = URL.ORDER.DELETE_LIST;
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const add_order = async (order) => {
    const url = URL.ORDER.ADD
    try {
        const rs = await api.post(url, order)
        return rs;
    }
    catch (error) {
        return error.response;

    }
}

