import React, { createContext, useState, useEffect } from "react";

export const WindowSizeContext = createContext();

export const WindowSizeProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.electron.onWindowResize(({ width }) => {
      setWindowWidth(width);
    });
    return () => {
      window.electron.onWindowResize(() => {});
    };
  }, []);

  return (
    <WindowSizeContext.Provider
      value={{
        windowWidth,
      }}
    >
      {children}
    </WindowSizeContext.Provider>
  );
};
