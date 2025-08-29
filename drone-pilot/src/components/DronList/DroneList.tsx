import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

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

const useDroneList = (): { drones: Drone[] } => {
  const { features } = useContext(SocketContext);

  const drones: Drone[] = features.map(f => {
    const registration = f.properties.registration;
    const partAfterDash = registration.split("-")[1] || "";
    const canFly = partAfterDash.startsWith("B");

    return {
      name: f.properties.Name,
      altitude: f.properties.altitude,
      pilot: f.properties.pilot,
      org: f.properties.organization,
      serial: f.properties.serial,
      registration,
      yaw: f.properties.yaw || 0,
      canFly,
    };
  });

  return { drones };
};

export default useDroneList;
