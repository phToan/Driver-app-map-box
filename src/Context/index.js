import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lightDot, setLightDot] = useState(false);
  const [isOrderSelected, setIsOrderSelected] = useState(false);
  const toggleLightDot = () => {
    setLightDot(!lightDot);
  };
  const [keySelected, setKeySelected] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [focusScreen, setFocusScreen] = useState("");
  const [key, setKey] = useState("");
  const [avatar, setAvatar] = useState("");
  const [id, setId] = useState("");
  const [isAuto, setIsAuto] = useState(false);
  const [itemOrder, setItemOrder] = useState(null);
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
        key,
        setKey,
        avatar,
        setAvatar,
        id,
        setId,
        isAuto,
        setIsAuto,
        itemOrder,
        setItemOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
