import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [lightDot, setLightDot] = useState(false);
    const [isOrderSelected, setIsOrderSelected] = useState(false);
    const toggleLightDot = () => {
        setLightDot(!lightDot);
    };

    return (
        <AppContext.Provider
            value={{
                lightDot,
                toggleLightDot,
                isOrderSelected,
                setIsOrderSelected,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
