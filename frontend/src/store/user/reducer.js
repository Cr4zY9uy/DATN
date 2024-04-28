import { UpdateLocalStorage } from "../../utils/updateLocalStorage";
import { ACTION } from "./action";

export const userReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case ACTION.LOGIN: {
            newState = { ...state, currentUser: action.payload }
            UpdateLocalStorage(newState, "user");
            return newState;
        }
        case ACTION.LOGOUT: {
            newState = { ...state, currentUser: null }
            UpdateLocalStorage(newState, "user")
            return newState
        }
        default:
            return state
    }
}