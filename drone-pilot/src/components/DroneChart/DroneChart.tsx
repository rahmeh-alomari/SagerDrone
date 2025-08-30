import { useDroneChartGeneric } from "../../hooks/useDroneChartData";
import DroneChartHTML from "./DroneChartHTML";

const DroneChart = () => {
  const altitudeData = useDroneChartGeneric<"bar">({
    chartType: "bar",
    property: "altitude",
    label: "Altitude (m)",
    getColor: f => (f.properties?.registration?.startsWith("B") ? "green" : "red"),
  });

  const orgData = useDroneChartGeneric<"doughnut">({
    chartType: "doughnut",
    property: "organization",
    getColor: (org, idx = 0) => `hsl(${idx * 60}, 70%, 50%)`,
  });

  return <DroneChartHTML altitudeData={altitudeData} organizationData={orgData} />;
};

export default DroneChart;
