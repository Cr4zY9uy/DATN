import { useReducer } from "react"
import { favouriteReducer } from "./reducer.js"
import { favourite } from "./state.js"
import { createContext } from "react";

export const FavouriteContext = createContext({
    state: null,
    dispatch: () => undefined
})

const storedState = JSON.parse(localStorage.getItem('favourite')) ? JSON.parse(localStorage.getItem('favourite')) : favourite;

export const FavouriteProvider = ({ children }) => {
    const [state, dispatch] = useReducer(favouriteReducer, storedState)
    return <FavouriteContext.Provider value={{ state, dispatch }}>{children}</FavouriteContext.Provider>
}
