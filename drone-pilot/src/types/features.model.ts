import { createContext } from "react";
import type { Feature } from "../types/features.model";

export interface SocketContextState {
  features: Feature[];
  error: string | null;
  reconnect: () => void;
  selectedDroneSerial: string | null;
  setSelectedDroneSerial: (serial: string | null) => void;
}

export const SocketContext = createContext<SocketContextState>({
  features: [],
  error: null,
  reconnect: () => {},
  selectedDroneSerial: null,
  setSelectedDroneSerial: () => {},
});
