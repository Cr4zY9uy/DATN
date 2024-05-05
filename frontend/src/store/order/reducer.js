import { ACTION_ORDER } from "./action";
import { UpdateLocalStorage } from "../../utils/updateLocalStorage";

const initialOrderState = {
    currentOrder: localStorage.getItem('currentOrder') ? JSON.parse(localStorage.getItem('currentOrder'))?.currentOrder : {},
    // Other properties of your cart state, if any
};

export const orderReducer = (state = initialOrderState, action) => {
    let newState;
    switch (action.type) {
        case ACTION_ORDER.ADD_ORDER: {
            console.log(action.payload);
            newState = { ...state, currentOrder: action.payload };
            UpdateLocalStorage(newState, "currentOrder");
            return newState;
        }
        case ACTION_ORDER.REMOVE_ORDER: {
            newState = { ...state, currentOrder: {} };
            UpdateLocalStorage(newState, "currentOrder");
            return newState;
        }
        default:
            return state
    }
}