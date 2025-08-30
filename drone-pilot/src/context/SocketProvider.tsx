import { useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { SocketContext } from "./SocketContext";
import { socketService } from "../services/socketService";
import type { FeatureCollection, Feature, SocketProviderState } from "../types/features.model";
import { environment } from "../environments/environment";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDroneSerial, setSelectedDroneSerial] = useState<string | null>(null);

  const isConnecting = useRef(false);
  const retryTimeout = useRef<NodeJS.Timeout | null>(null);

  const connectSocket = useCallback(() => {
    if (isConnecting.current) return; 
    isConnecting.current = true;

    socketService.connect(environment.socketUrl);

    socketService.unsubscribe("message");

    socketService.subscribe<FeatureCollection>("message", (data) => {
      setFeatures(data.features);
      setError(null);
    });

    socketService.onError((err: Error) => {
      console.error("Socket error:", err);
      setError("Socket error: " + err?.message || "Unknown error");
    });

    socketService.onDisconnect(() => {
      setError("Disconnected from socket, retrying...");
      isConnecting.current = false;

      if (retryTimeout.current) clearTimeout(retryTimeout.current);

      retryTimeout.current = setTimeout(() => {
        connectSocket();
      }, 3000);
    });

    isConnecting.current = false;
  }, []);

  useEffect(() => {
    connectSocket();

    return () => {
      socketService.disconnect();
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
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
