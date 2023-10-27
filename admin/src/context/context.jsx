import { createContext, useContext as ReactContext, useMemo, useReducer } from "react";
import { configStates, authStates, hotelStates } from "./state";
import { configsReducer, authsReducer, hotelsReducer } from "./";

const configsContext = createContext(configStates);
const authsContext = createContext(authStates);
const hotelsContext = createContext(hotelStates);

export const ContextProvider1 = ({ children }) => {
   const [controller, dispatch] = useReducer(configsReducer, configStates);
   const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

   return <configsContext.Provider value={value}>{children}</configsContext.Provider>;
};

export const ContextProvider2 = ({ children }) => {
   const [authsStates, authsDispatch] = useReducer(authsReducer, authStates);
   const value = useMemo(() => [authsStates, authsDispatch], [authsStates, authsDispatch]);

   return <authsContext.Provider value={value}>{children}</authsContext.Provider>;
};

export const ContextProvider3 = ({ children }) => {
   const [hotelsStates, hotelsDispatch] = useReducer(hotelsReducer, hotelStates);
   const value = useMemo(() => [hotelsStates, hotelsDispatch], [hotelsStates, hotelsDispatch]);

   return <hotelsContext.Provider value={value}>{children}</hotelsContext.Provider>;
};

export const useContext = (flag = 0) => {
   if (flag === 0) return ReactContext(configsContext);
   if (flag === 1) return ReactContext(authsContext);
   if (flag === 2) return ReactContext(hotelsContext);
};
