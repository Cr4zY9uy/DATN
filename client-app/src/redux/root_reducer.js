import { combineReducers } from "redux";
import user_reducer from "./user/user_reducer";
import product_reducer from "./product/product_reducer";
import order_reducer from "./order/order_reducer";
import category_reducer from "./category/category_reducer";
const root_reducer = combineReducers({
    user_reducer,
    product_reducer,
    order_reducer,
    category_reducer
})
export default root_reducer;