export interface FeatureProperties {
    serial: string;
    registration: string;
    Name: string;
    altitude: number;
    pilot: string;
    organization: string;
    yaw: number;
  }
  
  export interface Feature {
    type: "Feature";
    properties: FeatureProperties;
    geometry: {
      type: "Point";
      coordinates: number[];
    };
  }
  
  export interface FeatureCollection {
    type: "FeatureCollection";
    features: Feature[];
  }
  
  export interface SocketContextState {
    features: Feature[];
    error: string | null;
    reconnect: () => void;
  }

  export interface SocketProviderState {
    features: Feature[];
    error: string | null;
    reconnect: () => void;
  }