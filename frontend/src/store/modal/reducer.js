import { ACTION_MODAL } from "./action";

export const modalReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case ACTION_MODAL.OPEN_MODAL: {
            newState = { ...state, currentModal: true };
            return newState;
        }
        case ACTION_MODAL.CLOSE_MODAL: {
            newState = { ...state, currentModal: false };
            return newState;
        }
        default:
            return state
    }
}