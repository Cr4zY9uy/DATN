import { useReducer } from "react"
import { cartReducer } from "./reducer.js"
import { currentCart } from "./state.js"
import { createContext } from "react";

export const CartContext = createContext({
    state: null,
    dispatch: () => undefined
})

const storedState = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : currentCart;

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, storedState)
    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}
