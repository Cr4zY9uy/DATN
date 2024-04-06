import CATEGORY_ACTION from "./category_action";
const updateLocalStorage = (state) => {
    localStorage.setItem("category", JSON.stringify(state));
    return state;
}
const STATE = {
    currentCategory: {},
}
const initData = localStorage.getItem("category") ? JSON.parse(localStorage.getItem("category")) : STATE;

const category_reducer = (state = initData, action) => {
    switch (action.type) {
        case CATEGORY_ACTION.CURRENT: return updateLocalStorage({ ...state, currentCategory: action.payload });
        default: return state;
    }
}
export default category_reducer;