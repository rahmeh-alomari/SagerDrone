// MainContentHTML.tsx
import type { Feature } from "../../../types/features.model";

interface MainContentHTMLProps {
  features: Feature[];
  error: string | null;
  children?: React.ReactNode;
}

const MainContentHTML = ({ features, error, children }: MainContentHTMLProps) => {
  return (
    <div className="text-center">
      <h1 className="text-xl font-semibold mb-2">Drone Tracker</h1>

      {error && <p className="text-red-600">{error}</p>}

      <ul>
        {features.map((f) => (
          <li key={f.properties.serial}>
            {f.properties.Name} - {f.properties.registration} - Alt: {f.properties.altitude}m
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
};

export default MainContentHTML;
