import { useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { SocketContext } from "./SocketContext";
import { socketService } from "../services/socketService";
import type { FeatureCollection, Feature, SocketProviderState } from "../types/features.model";
import { environment } from "../environments/environment";

const MAX_FEATURES = 20000; 
const BATCH_INTERVAL = 300; 

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDroneSerial, setSelectedDroneSerial] = useState<string | null>(null);

  const buffer = useRef<Feature[]>([]);
  const isConnecting = useRef(false);
  const retryTimeout = useRef<NodeJS.Timeout | null>(null);
  const isSubscribed = useRef(false); 

  const connectSocket = useCallback(() => {
    if (isConnecting.current) return;
    isConnecting.current = true;

    socketService.connect(environment.socketUrl);

    if (!isSubscribed.current) {
      socketService.subscribe<FeatureCollection>("message", (data) => {
        buffer.current.push(...data.features);
      });
      isSubscribed.current = true;
    }

    socketService.onError((err: Error) => setError("Socket error: " + (err?.message || "Unknown error")));
    socketService.onDisconnect(() => {
      setError("Disconnected from socket");
      isConnecting.current = false;
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
      retryTimeout.current = setTimeout(connectSocket, 3000);
    });

    isConnecting.current = false;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (buffer.current.length > 0) {
        setFeatures(prev => {
          const combined = [...prev, ...buffer.current];
          buffer.current = [];
          return combined.slice(-MAX_FEATURES);
        });
      }
    }, BATCH_INTERVAL);

    return () => clearInterval(interval);
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
