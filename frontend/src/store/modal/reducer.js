import { ACTION } from "./action";

export const modalReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case ACTION.OPEN_MODAL: {
            newState = { ...state, currentModal: true };
            return newState;
        }
        case ACTION.CLOSE_MODAL: {
            newState = { ...state, currentModal: false };
            return newState;
        }
        default:
            return state
    }
}