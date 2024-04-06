const URL = {
    PRODUCT: {
        ALL: 'product',
        PAGINATE: 'product_paginate',
        DETAIL: 'product_detail/',
        ADD: 'product/add',
        DELETE_ID: 'product/delete/',
        EDIT: 'product/edit/',
        DELETE_ALL: 'product/delete_all',
        DELETE_LIST: 'product/delete_list'

    },
    CATEGORY: {
        ALL: 'category',
        PAGINATE: 'category_paginate',
        DETAIL: 'category_detail/',
        ADD: 'category/add',
        DELETE_ID: 'category/delete/',
        EDIT: 'category/edit/',
        DELETE_ALL: 'category/delete_all',
        DELETE_LIST: 'category/delete_list'
    },
    USER: {
        LOGIN: 'login',
        REGISTER: 'register',
        REFRESH_ACCESS_TOKEN: 'refresh_access_token',
        REFRESH_TOKEN: 'refresh_token',
        LOGOUT: 'logout'
    },
    ORDER: {
        PAGINATE: 'order_paginate',
        ALL: 'order',
        DETAIL: 'order_detail/',
        EDIT: 'order/edit/',
        DELETE_ID: 'order/delete/',
        DELETE_ALL: 'order/delete_all',
        DELETE_LIST: 'order/delete_list'

    }
}
export default URL;