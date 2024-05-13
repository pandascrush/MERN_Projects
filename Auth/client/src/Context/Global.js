import { createContext, useContext } from "react";

export const ContextProvider =  createContext()
export const ContextUser = () => useContext(ContextProvider)