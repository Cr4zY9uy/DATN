import { useReducer } from "react"
import { orderReducer } from "./reducer"
import { currentOrder } from "./state"
import { createContext } from "react";

export const OrderContext = createContext({
    state: null,
    dispatch: () => undefined
})
const storedState = JSON.parse(localStorage.getItem('currentOrder')) ? JSON.parse(localStorage.getItem('currentOrder')) : currentOrder;

export const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, storedState)
    return <OrderContext.Provider value={{ state, dispatch }}>{children}</OrderContext.Provider>
}
