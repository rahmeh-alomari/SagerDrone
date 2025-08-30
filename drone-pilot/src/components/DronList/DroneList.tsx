import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import type { Drone } from "../../types/Drone.model";

const useDroneList = (): { drones: Drone[] } => {
  const { features } = useContext(SocketContext);

  const drones: Drone[] = features.map(f => {
    const registration = f.properties.registration ?? ""; 
    const partAfterDash = registration.split("-")[1] || "";
    const canFly = partAfterDash.startsWith("B");

    return {
      name: f.properties.Name ?? "Unknown",
      altitude: f.properties.altitude ?? 0, 
      pilot: f.properties.pilot ?? "Unknown",
      org: String(f.properties.organization ?? "Unknown"), 
      serial: f.properties.serial ?? "Unknown",
      registration,
      yaw: f.properties.yaw ?? 0,
      canFly,
    };
  });

  return { drones };
};

export default useDroneList;
