import { createContext, useState } from "react";

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [isLog, setIsLog] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    return (
        <AppContext.Provider
            value={{ isLog, setIsLog, isOpen, setIsOpen }}>
            {children}
        </AppContext.Provider>
    );
}
