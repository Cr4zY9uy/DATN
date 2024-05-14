import api from "../request/api";
import URL from "../request/url";

export const count_product_category = () => api.get(URL.STATITICS.COUNT_PRODUCT_CATEGORY)

export const count_order = () => api.get(URL.STATITICS.ORDER)

export const count_statitics = () => api.get(URL.STATITICS.TOTAL)

export const order_per_month = () => api.get(URL.STATITICS.ORDER_PER_MONTH)

export const order_per_day = () => api.get(URL.STATITICS.ORDER_PER_DAY)

export const unsold = () => api.get(URL.STATITICS.UNSOLD)