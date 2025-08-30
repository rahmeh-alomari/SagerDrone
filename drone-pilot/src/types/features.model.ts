import { createContext } from "react";
export interface DroneProperties {
  Name: string;
  serial: string;
  registration?: string;
  altitude?: number;
  yaw?: number;
  pilot?: string;
  org?: string;
  canFly?: boolean;
  [key: string]: string | number | boolean | undefined; }

export interface Feature {
  type: "Feature";
  geometry: {
    type: "Point" | "LineString";
    coordinates: [number, number] | [number, number][]; 
  };
  properties: DroneProperties & { featureType?: "drone" | "path"; droneId?: string };
}

export interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

export interface SocketProviderState {
  features: Feature[];
  error: string | null;
  reconnect: () => void;
  selectedDroneSerial: string | null;
  setSelectedDroneSerial: (serial: string | null) => void;
}

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
