import { useReducer } from "react"
import { logTypeReducer } from "./reducer"
import { isLogByGoogle } from "./state"
import { createContext } from "react";

export const LogContext = createContext({
    state: false,
    dispatch: () => undefined
})

const storedState = JSON.parse(localStorage.getItem('isLogGoogle')) ? JSON.parse(localStorage.getItem('isLogGoogle')) : isLogByGoogle;

export const LogProvider = ({ children }) => {
    const [state, dispatch] = useReducer(logTypeReducer, storedState)
    return <LogContext.Provider value={{ state, dispatch }}>{children}</LogContext.Provider>
}
