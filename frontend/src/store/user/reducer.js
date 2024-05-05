import { UpdateLocalStorage } from "../../utils/updateLocalStorage";
import { ACTION_USER } from "./action";


const initialUserState = {
    currentUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.currentUser : {},
    // Other properties of your cart state, if any
};


export const userReducer = (state = initialUserState, action) => {
    let newState;
    switch (action.type) {
        case ACTION_USER.LOGIN: {
            newState = { ...state, currentUser: action.payload }
            UpdateLocalStorage(newState, "user");
            return newState;
        }
        case ACTION_USER.LOGOUT: {
            newState = { ...state, currentUser: null }
            UpdateLocalStorage(newState, "user")
            return newState
        }
        default:
            return state
    }
}