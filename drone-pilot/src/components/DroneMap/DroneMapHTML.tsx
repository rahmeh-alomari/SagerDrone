import type { DroneMapHTMLProps } from "../../types/Drone.model";

const DroneMapHTML = ({ mapContainerRef }: DroneMapHTMLProps) => {
  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%", border: "1px solid #ddd", borderRadius: 8 }}
    />
  );
};

export default DroneMapHTML;
