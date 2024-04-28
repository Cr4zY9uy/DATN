import { UpdateLocalStorage } from "../../utils/updateLocalStorage";
import { ACTION } from "./action";

export const cartReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case ACTION.ADD_CART: {
            const existingItem = state.currentCart.find(item => item.id === action.payload.id);
            if (existingItem) {
                const updatedCart = state.currentCart.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity + action.payload.quantity
                        };
                    }
                    return item;
                });
                newState = { ...state, currentCart: updatedCart };
            } else {
                newState = {
                    ...state,
                    currentCart: { ...state, currentCart: action.payload }
                };
            }
            UpdateLocalStorage(newState, "cart");
            return newState;
        }
        case ACTION.REMOVE_CART: {
            newState = { ...state, currentCart: null }
            UpdateLocalStorage(newState, "cart")
            return newState
        }
        case ACTION.DELETE_ITEM: {
            const filteredCart = state?.currentCart?.filter((item) => item.id !== action.payload)
            newState = { ...state, currentCart: filteredCart }
            return newState
        }
        case ACTION.UPDATE_CART: {
            const updatedCart = state?.currentCart?.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, quantity: action.payload.quantity };
                }
                return item;
            });
            newState = { ...state, currentCart: updatedCart }
            return newState
        }
        default:
            return state
    }
}