import { createContext, useMemo, useReducer, useContext as ReactContext, useState } from "react";
import { hotelsStates, usersStates, configsStates } from "./states";
import { hotelsReducer } from "./hotels/reducer";
import { usersReducer } from "./users/reducer";

let hotelsContext = createContext(hotelsStates);
let usersContext = createContext(usersStates);
let configsContext = createContext(configsStates);

export const ContextProvider1 = ({ children }) => {
	let [usersState, usersDispatch] = useReducer(usersReducer, usersStates);
	let value = useMemo(() => ({ usersState, usersDispatch }), [usersState, usersDispatch]);
	return <usersContext.Provider value={value}>{children}</usersContext.Provider>;
};

export const ContextProvider2 = ({ children }) => {
	let [hotelsState, hotelsDispatch] = useReducer(hotelsReducer, hotelsStates);
	let value = useMemo(() => ({ hotelsState, hotelsDispatch }), [hotelsState, hotelsDispatch]);
	return <hotelsContext.Provider value={value}>{children}</hotelsContext.Provider>;
};

export const ContextProvider3 = ({ children }) => {
	let [controller, setController] = useState(configsStates);
	let value = useMemo(() => ({ controller, setController }), [controller, setController]);
	return <configsContext.Provider value={value}>{children}</configsContext.Provider>;
};

const useContext = (flag) => {
	if (flag === 0) return ReactContext(hotelsContext);
	if (flag === 1) return ReactContext(usersContext);
	if (flag === 2) return ReactContext(configsContext);
};

export default useContext;
