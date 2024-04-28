const URL = {
    PRODUCT: {
        CRUD: 'category',
        DELETE_LIST: 'category/delete_list',
        OPTIONS: 'category/options'

    },
    CATEGORY: {
        CRUD: 'category',
        OPTIONS: 'category/options'
    },
    BANNER: {
        CRUD: 'banner',
        OPTIONS: 'banner/options'
    },
    BLOG: {
        CRUD: "blog",
    },
    USER: {
        LOGIN: 'login',
        REGISTER: 'register',
        DELETE: "users/delete/",
        DETAIL: "uses/detail/",
        UPDATE: "users/update/",
        GET_ME: 'user',
        REFRESH_ACCESS_TOKEN: 'refresh_access_token',
        REFRESH_TOKEN: 'refresh_token',
        LOGOUT: 'logout',
        FORGOT: 'forget-password',
        RESET: 'reset-password'
    },
    ORDER: {
        CRUD: 'category',
        DELETE_LIST: 'category/delete_list',
        OPTIONS: 'category/options'
    },
    CHAT: {
        CRUD: 'chat',
        DETAIL: 'chat/'
    },
    UPLOAD: "upload_image",
    PAYMENT: "create_payment_url"
}
export default URL;