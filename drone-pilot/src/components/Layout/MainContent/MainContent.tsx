import { useContext } from "react";
import { SocketContext } from "../../../context/SocketContext";
import type { MainContentProps } from "../../../types/mainContant.models";
import MainContentHTML from "./MainContentHTML";
import DroneMap from "../../DroneMap/DroneMap";

const MainContent = ({ children }: MainContentProps) => {
  const { features, error } = useContext(SocketContext);

  return (
    <MainContentHTML features={features} error={error}>
      <DroneMap features={features} />
      {children}
    </MainContentHTML>
  );
};

export default MainContent;
