import { useContext, useMemo } from "react";
import { SocketContext } from "../context/SocketContext";
import type { ChartData, ChartDataset } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface DroneChartConfig {
  chartType: "bar" | "doughnut";
  property: string;
  label?: string;
  getColor?: (value: string | number, idx?: number) => string;
}

export const useDroneChartGeneric = <T extends "bar" | "doughnut">({
  chartType,
  property,
  label,
  getColor,
}: DroneChartConfig): ChartData<T> => {
  const { features } = useContext(SocketContext);

  return useMemo(() => {
    if (!features || features.length === 0) {
      return { labels: [], datasets: [] } as ChartData<T>;
    }

    if (chartType === "bar") {
      const labels = features.map(f => f.properties?.Name ?? "Unknown");

      const data: number[] = features.map(f => {
        const value = f.properties?.[property];
        if (typeof value === "number") return value;
        if (typeof value === "string") return parseFloat(value) || 0;
        return 0;
      });

      const backgroundColor = features.map((f, idx) => (getColor ? getColor(f.properties?.[property] ?? 0, idx) : "blue"));

      const datasets: ChartDataset<"bar", number[]>[] = [
        {
          label: label ?? property,
          data,
          backgroundColor,
        },
      ];

      return { labels, datasets } as ChartData<T>;
    }

    if (chartType === "doughnut") {
      const countMap: Record<string, number> = {};

      features.forEach(f => {
        const rawKey = f.properties?.[property] ?? "Unknown";
        const key = String(rawKey); 
        countMap[key] = (countMap[key] || 0) + 1;
      });

      const labels = Object.keys(countMap);
      const data = Object.values(countMap);
      const backgroundColor = labels.map((lbl, idx) => (getColor ? getColor(lbl, idx) : `hsl(${(idx * 360) / labels.length}, 70%, 50%)`));

      const datasets: ChartDataset<"doughnut", number[]>[] = [
        {
          data,
          backgroundColor,
        },
      ];

      return { labels, datasets } as ChartData<T>;
    }

    return { labels: [], datasets: [] } as ChartData<T>;
  }, [features, chartType, property, label, getColor]);
};
