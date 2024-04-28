import { useReducer } from "react"
import { orderReducer } from "./reducer"
import { currentOrder } from "./state"
import { createContext } from "react";

const OrderContext = createContext({
    state: null,
    dispatch: () => undefined
})

export const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, currentOrder)
    return <OrderContext.Provider value={{ state, dispatch }}>{children}</OrderContext.Provider>
}
