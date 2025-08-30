import { Bar, Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

interface DroneSidebarHTMLProps {
  altitudeData: ChartData<"bar">;
  organizationData: ChartData<"doughnut">;
}

const DroneSidebarHTML = ({ altitudeData, organizationData }: DroneSidebarHTMLProps) => {
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#f0f0f0", font: { size: 14 } },
      },
    },
  };

  const barOptions: ChartOptions<"bar"> = {
    ...baseOptions,
    scales: {
      x: { ticks: { color: "#f0f0f0" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "#f0f0f0" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  const doughnutOptions: ChartOptions<"doughnut"> = {
    ...baseOptions,
    cutout: "70%", 
  };

  return (
    <div className="flex gap-4 p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl h-[400px]">
      <div className="flex-1 h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-4 shadow-lg">
        <h3 className="text-white font-semibold mb-2 text-center">Altitude Overview</h3>
        <Bar data={altitudeData} options={barOptions} />
      </div>

      <div className="flex-1 h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-4 shadow-lg">
        <h3 className="text-white font-semibold mb-2 text-center">Organization Distribution</h3>
        <Doughnut data={organizationData} options={doughnutOptions} />
      </div>
    </div>
  );
};

export default DroneSidebarHTML;
