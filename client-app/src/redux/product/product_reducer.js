import PRODUCT_ACTION from "./product_action";
const updateLocalStorage = (state) => {
    localStorage.setItem("products", JSON.stringify(state));
    return state;
}
const STATE = {
    products: []
}
const initData = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : STATE;


const product_reducer = (state = initData, action) => {
    switch (action.type) {
        case PRODUCT_ACTION.ADD_PRODUCT: return updateLocalStorage({ ...state, products: action.payload });
        default: return state;
    }
}
export default product_reducer;