import type { RefObject } from "react";
import type { Feature } from "./features.model";

export interface DroneMapHTMLProps {
    mapContainerRef: RefObject<HTMLDivElement | null>;
  }
  export  interface DroneMapProps {
    features: Feature[];
  }
  export interface Drone {
    name: string;
    altitude: number;
    pilot: string;
    org: string;
    serial: string;
    registration: string;
    yaw: number;
    canFly: boolean;
  }
  export interface DroneListHTMLProps {
    onClickDrone?: (serial: string) => void;
  }