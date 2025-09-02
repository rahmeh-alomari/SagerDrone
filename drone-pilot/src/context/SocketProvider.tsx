import { useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { SocketContext } from "./SocketContext";
import { socketService } from "../services/socketService";
import type { FeatureCollection, Feature, SocketProviderState } from "../types/features.model";
import { environment } from "../environments/environment";

const MAX_FEATURES = 20000; 
const BATCH_INTERVAL = 300; 

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [dronePaths, setDronePaths] = useState<Feature[]>([]); 
  const [highlightedPath, setHighlightedPath] = useState<Feature | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDroneSerial, setSelectedDroneSerial] = useState<string | null>(null);

  const buffer = useRef<Feature[]>([]);
  const droneHistory = useRef<Map<string, [number, number][]>>(new Map()); 
  const isConnecting = useRef(false);
  const retryTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSubscribed = useRef(false); 

  const highlightDronePath = useCallback((serial: string) => {
    const path = dronePaths.find(p => p.properties.serial === serial);
    setHighlightedPath(path || null);
  }, [dronePaths]);

  const connectSocket = useCallback(() => {
    if (isConnecting.current) return;
    isConnecting.current = true;

    socketService.connect(environment.socketUrl);

    if (!isSubscribed.current) {
      socketService.subscribe<FeatureCollection>("message", (data) => {
       
        buffer.current.push(...(data.features || []));
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
        const newFeatures = [...buffer.current];
        buffer.current = [];


        newFeatures.forEach(feature => {
          if (feature.properties.serial && feature.geometry.type === "Point") {
            const coordinates = feature.geometry.coordinates as [number, number];
            const serial = feature.properties.serial;
            
            
            if (!droneHistory.current.has(serial)) {
              droneHistory.current.set(serial, []);
            }
            
            const history = droneHistory.current.get(serial)!;
            
            history.push(coordinates);
            
            if (history.length === 1) {
              const baseLng = coordinates[0];
              const baseLat = coordinates[1];
              
              history.push([baseLng + 0.001, baseLat + 0.001]);
              history.push([baseLng + 0.002, baseLat + 0.0005]);
              history.push([baseLng + 0.0015, baseLat - 0.0005]);
              history.push([baseLng, baseLat]);
            }
            
            if (history.length > 30) {
              history.shift();
            }
            
            console.log("History for", serial, ":", history.length, "points");
          }
        });

        const paths: Feature[] = [];
        droneHistory.current.forEach((coordinates, serial) => {
          if (coordinates.length > 1) {
            paths.push({
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: coordinates
              },
              properties: {
                Name: `Path-${serial}`,
                serial: serial,
                featureType: "path",
                droneId: serial
              }
            });
          }
        });


        setFeatures(prev => {
          const combined = [...prev, ...newFeatures];
          return combined.slice(-MAX_FEATURES);
        });
        
        setDronePaths(paths);
      }
    }, BATCH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedDroneSerial) {
      highlightDronePath(selectedDroneSerial);
    } else {
      setHighlightedPath(null);
    }
  }, [selectedDroneSerial, highlightDronePath]);

  useEffect(() => {
    connectSocket();
    return () => {
      socketService.disconnect();
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
    };
  }, [connectSocket]);

  const state: SocketProviderState = {
    features,
    dronePaths, 
    highlightedPath, 
    error,
    reconnect: connectSocket,
    selectedDroneSerial,
    setSelectedDroneSerial,
  };

  return <SocketContext.Provider value={state}>{children}</SocketContext.Provider>;
};
