import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [lightDot, setLightDot] = useState(false);
    const [isOrderSelected, setIsOrderSelected] = useState(false);
    const toggleLightDot = () => {
        setLightDot(!lightDot);
    };
    const [keySelected, setKeySelected] = useState('');
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [focusScreen, setFocusScreen] = useState('');

    return (
        <AppContext.Provider
            value={{
                lightDot,
                toggleLightDot,
                isOrderSelected,
                setIsOrderSelected,
                focusScreen,
                setFocusScreen,
                keySelected,
                setKeySelected,
                visiblePopup,
                setVisiblePopup,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
