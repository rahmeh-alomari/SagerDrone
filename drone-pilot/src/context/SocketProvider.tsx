import { useEffect, useState,  useCallback, type ReactNode } from "react";
import { SocketContext } from "./SocketContext";
import { socketService } from "../services/socketService";
import type { FeatureCollection, Feature, SocketProviderState } from "../types/features.model";
import { environment } from "../environments/environment";



export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDroneSerial, setSelectedDroneSerial] = useState<string | null>(null);

  const connectSocket = useCallback(() => {
    socketService.connect(environment.socketUrl);

    socketService.subscribe<FeatureCollection>("message", (data) => {
      setFeatures(data.features);
      setError(null);
    
      console.log("Received drones:", data.features.length);
      data.features.forEach((f) => {
        console.log(`Drone: ${f.properties.Name}, Serial: ${f.properties.serial}, Registration: ${f.properties.registration}`);
      });
    });
    

    socketService.onError((err: Error) => {
      setError("Socket error: " + err?.message || "Unknown error");
    });

    socketService.onDisconnect(() => {
      setError("Disconnected from socket, retrying...");
      setTimeout(() => {
        connectSocket();
      }, 3000);
    });
  }, []);

  useEffect(() => {
    connectSocket();
  
    return () => {
      socketService.unsubscribe("message");
    };
  }, [connectSocket]);

  const state: SocketProviderState = {
    features,
    error,
    reconnect: connectSocket,
    selectedDroneSerial,
    setSelectedDroneSerial, 
  };

  return <SocketContext.Provider value={state}>{children}</SocketContext.Provider>;
};
