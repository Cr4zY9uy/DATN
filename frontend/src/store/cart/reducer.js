import { UpdateLocalStorage } from "../../utils/updateLocalStorage";
import { ACTION_CART } from "./action";

const initialCartState = {
    currentCart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))?.currentCart : [],
    // Other properties of your cart state, if any
};
export const cartReducer = (state = initialCartState, action) => {
    let newState;
    switch (action.type) {
        case ACTION_CART.ADD_CART: {
            const currentCart = state.currentCart || [];
            const existingItem = currentCart.find(item => item.id === action.payload.id);
            if (existingItem) {
                const updatedCart = currentCart.map(item => {
                    if (item.id === action.payload.id) {
                        let totalQuantityBuy = action.payload.quantityBuy + existingItem.quantityBuy;
                        if (totalQuantityBuy > item.quantity) totalQuantityBuy = item.quantity;
                        return {
                            ...item,
                            quantityBuy: totalQuantityBuy
                        };
                    }
                    return item;
                });
                newState = { ...state, currentCart: updatedCart };
            } else {
                newState = {
                    ...state,
                    currentCart: [...currentCart, action.payload]
                };
            }
            UpdateLocalStorage(newState, "cart");
            return newState;

        }
        case ACTION_CART.REMOVE_CART: {
            newState = { ...state, currentCart: [] }
            UpdateLocalStorage(newState, "cart")
            return newState
        }
        case ACTION_CART.DELETE_ITEM: {
            const filteredCart = state?.currentCart?.filter((item) => item.id !== action.payload)
            newState = { ...state, currentCart: filteredCart }
            UpdateLocalStorage(newState, "cart");
            return newState
        }
        case ACTION_CART.UPDATE_CART: {
            const updatedProducts = action.payload;
            const updatedCart = state.currentCart.map(item => {
                const updatedProduct = updatedProducts.find(p => p.id === item.id);
                if (updatedProduct) {
                    return { ...item, quantityBuy: updatedProduct.quantityBuy };
                }
                return item;
            });

            newState = { ...state, currentCart: updatedCart };
            UpdateLocalStorage(newState, "cart");
            return newState
        }
        default:
            return state
    }
}