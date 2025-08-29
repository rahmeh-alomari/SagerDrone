import type { Feature } from "../../../types/features.model";
import DroneListHTML from "../../DronList/DroneListHtml";

interface MainContentHTMLProps {
  features: Feature[];
  error: string | null;
  children?: React.ReactNode; 
}

const MainContentHTML = ({ features, error, children }: MainContentHTMLProps) => {
  return (
    <div className="flex h-screen gap-4 p-4">
      <div className="w-1/3 bg-gray-800 text-white  p-4 rounded-md overflow-auto">
        <h1 className="text-xl font-semibold mb-4">Drone Tracker</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <ul className="mb-4">
          {features.map((f) => (
            <li key={f.properties.serial}>
              {f.properties.Name} - {f.properties.registration} - Alt: {f.properties.altitude}m
            </li>
          ))}
        </ul>

        <DroneListHTML />
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default MainContentHTML;
