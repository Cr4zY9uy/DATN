const URL = {
    PRODUCT: {
        CRUD: 'product',
        OPTIONS: 'product/options',
        RECOMMEND: 'product/recommend'
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
        CRUD: 'users',
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
        RESET: 'reset-password',
        LOGIN_GOOGLE: 'login/google/success',
        LOGOUT_GOOGLE: 'logout/google',
        RESET_PASSWORD_CURRENT: 'reset-password-current'
    },
    ORDER: {
        CRUD: 'order',
        DELETE_LIST: 'order/delete_list',
        OPTIONS: 'order/options',
        BY_USER: "order/user"
    },
    CHAT: {
        CRUD: 'chat',
        DETAIL: 'chat/'
    },
    UPLOAD: "upload_image",
    PAYMENT: "create_payment_url"
}
export default URL;