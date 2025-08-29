import { useEffect, useState } from "react";
import type { Feature } from "../types/features.model";

export const useDronePath = (
  serial: string,
  featuresFromSocket: Feature[]
) => {
  const [pathCoords, setPathCoords] = useState<[number, number][]>([]);

  useEffect(() => {
    const droneFeatures = featuresFromSocket.filter(f => f.properties.serial === serial);
    if (droneFeatures.length === 0) return;

    const newCoords = droneFeatures.map(f => f.geometry.coordinates as [number, number]);

    setPathCoords(prev => [...prev, ...newCoords]);
  }, [featuresFromSocket, serial]);

  return pathCoords;
};
