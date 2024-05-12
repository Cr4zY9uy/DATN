import { ACTION_LOG } from "./action";
import { UpdateLocalStorage } from "../../utils/updateLocalStorage";

const initialLogState = {
    isLogByGoogle: localStorage.getItem('isLogByGoogle') ? JSON.parse(localStorage.getItem('isLogByGoogle'))?.isLogByGoogle : false,
};

export const logTypeReducer = (state = initialLogState, action) => {
    let newState;
    switch (action.type) {
        case ACTION_LOG.IN: {
            newState = { ...state, isLogByGoogle: true };
            UpdateLocalStorage(newState, "isLogGoogle")
            return newState;
        }
        case ACTION_LOG.OUT: {
            newState = { ...state, isLogByGoogle: false };
            UpdateLocalStorage(newState, "isLogGoogle")
            return newState;
        }
        default:
            return state
    }
}