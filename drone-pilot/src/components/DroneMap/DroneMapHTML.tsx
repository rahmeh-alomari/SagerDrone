import type { DroneMapHTMLProps } from "../../types/Drone.model";



const DroneMapHTML = ({ mapContainerRef }: DroneMapHTMLProps) => {
  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[500px] border border-gray-300 rounded-md mb-4"
    />
  );
};

export default DroneMapHTML;
