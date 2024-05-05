import { useReducer } from "react"
import { productLastViewReducer } from "./reducer.js"
import { createContext } from "react";
import { lastViewProduct } from "./state.js";

export const LastViewProductContext = createContext({
    state: null,
    dispatch: () => undefined
})

const storedState = JSON.parse(localStorage.getItem('lastViewProduct')) ? JSON.parse(localStorage.getItem('lastViewProduct')) : lastViewProduct;

export const LastViewProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productLastViewReducer, storedState)
    return <LastViewProductContext.Provider value={{ state, dispatch }}>{children}</LastViewProductContext.Provider>
}
