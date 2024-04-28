import { useReducer } from "react"
import { userReducer } from "./reducer"
import { currentUser } from "./state"
import { createContext } from "react";

export const UserContext = createContext({
    state: null,
    dispatch: () => undefined
})
const storedState = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : currentUser;

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, storedState)
    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}
