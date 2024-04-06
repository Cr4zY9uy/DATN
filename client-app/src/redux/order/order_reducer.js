import ORDER_ACTION from "./order_action";
const updateLocalStorage = (state) => {
    localStorage.setItem("order", JSON.stringify(state));
    return state;
}
const STATE = {
    currentOrder: {},
}
const initData = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : STATE;

const order_reducer = (state = initData, action) => {
    switch (action.type) {
        case ORDER_ACTION.CURRENT: return updateLocalStorage({ ...state, currentOrder: action.payload });
        default: return state;
    }
}
export default order_reducer;