import React, { createContext, useContext, useState } from 'react';

interface StateContextProps {
  currentColor: string;
  currentMode: string;
  activeMenu: boolean;
  screenSize: number | undefined;
  setScreenSize: (size: number | undefined) => void;
  handleClick: (clicked: keyof typeof initialState) => void;
  isClicked: typeof initialState;
  initialState: typeof initialState;
  setIsClicked: React.Dispatch<React.SetStateAction<typeof initialState>>;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
  setMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setColor: (color: string) => void;
  themeSettings: boolean;
  setThemeSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const StateContext = createContext<StateContextProps>({} as StateContextProps);

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider: React.FC = ({ children }) => {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked: keyof typeof initialState) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextProps => useContext(StateContext);

// import { createContext, useContext, useState } from 'react';

// const StateContext = createContext();

// const initialState = {
//   chat: false,
//   cart: false,
//   userProfile: false,
//   notification: false,
// };

// export const ContextProvider = ({ children }) => {
//   const [screenSize, setScreenSize] = useState(undefined);
//   const [currentColor, setCurrentColor] = useState('#03C9D7');
//   const [currentMode, setCurrentMode] = useState('Light');
//   const [themeSettings, setThemeSettings] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(true);
//   const [isClicked, setIsClicked] = useState(initialState);

//   const setMode = (e) => {
//     setCurrentMode(e.target.value);
//     localStorage.setItem('themeMode', e.target.value);
//   };

//   const setColor = (color) => {
//     setCurrentColor(color);
//     localStorage.setItem('colorMode', color);
//   };

//   const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

//   return (
//     <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);