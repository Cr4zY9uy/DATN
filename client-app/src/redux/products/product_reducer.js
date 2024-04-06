import PRODUCT_ACTION from "./product_action";
const updateLocalStorage = (state) => {
    localStorage.setItem("product", JSON.stringify(state));
    return state;
}
const STATE = {
    currentProduct: {},
}
const initData = localStorage.getItem("product") ? JSON.parse(localStorage.getItem("product")) : STATE;

const product_reducer = (state = initData, action) => {
    switch (action.type) {
        case PRODUCT_ACTION.CURRENT: return updateLocalStorage({ ...state, currentProduct: action.payload });
        default: return state;
    }
}
export default product_reducer;