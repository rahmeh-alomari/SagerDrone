import type { RefObject } from "react";
import type { Feature } from "./features.model";

export interface DroneMapHTMLProps {
    mapContainerRef: RefObject<HTMLDivElement | null>;
  }
  export  interface DroneMapProps {
    features: Feature[];
  }