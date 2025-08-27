// SocketContext.ts
import { createContext } from "react";
import type {  SocketContextState } from "../types/features.model";



export const SocketContext = createContext<SocketContextState>({
  features: [],
  error: null,
  reconnect: () => {},
});
