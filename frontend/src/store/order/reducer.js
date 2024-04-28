import { ACTION } from "./action";

export const orderReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case ACTION.ADD_ORDER: {
            newState = { ...state, currentOrder: action.payload };
            return newState;
        }
        case ACTION.REMOVE_ORDER: {
            newState = { ...state, currentOrder: {} };
            return newState;
        }
        default:
            return state
    }
}