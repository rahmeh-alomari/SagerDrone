import { useContext } from "react";
import { SocketContext } from "../../../context/SocketContext";
import MainContentHTML from "./MainContentHTML";
import DroneMap from "../../DroneMap/DroneMap";
import type { MainContentProps } from "../../../types/mainContant.models";

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
