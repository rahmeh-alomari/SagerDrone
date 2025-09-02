import { createContext } from "react";
import type {  SocketContextState } from "../types/features.model";



export const SocketContext = createContext<SocketContextState>({
  features: [],
  dronePaths: [], 
  highlightedPath: null, 
  error: null,
  reconnect: () => {},
  selectedDroneSerial: null,
  setSelectedDroneSerial: () => {},
});
