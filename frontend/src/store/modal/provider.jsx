import { useReducer } from "react"
import { modalReducer } from "./reducer"
import { currentModal } from "./state"
import { createContext } from "react";

export const ModalContext = createContext({
    state: null,
    dispatch: () => undefined
})

export const ModalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(modalReducer, currentModal)
    return <ModalContext.Provider value={{ state, dispatch }}>{children}</ModalContext.Provider>
}
