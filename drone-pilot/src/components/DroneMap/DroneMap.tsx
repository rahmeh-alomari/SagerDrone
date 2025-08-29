import { useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DroneMapHTML from "./DroneMapHTML";
import type { DroneMapProps } from "../../types/Drone.model";
import { environment } from "../../environments/environment";
import { SocketContext } from "../../context/SocketContext";

mapboxgl.accessToken = environment.VITE_MAPBOX_TOKEN;

const DroneMap = ({ features }: DroneMapProps) => {
  const { setSelectedDroneSerial } = useContext(SocketContext);

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const droneMarkers = useRef<Record<string, mapboxgl.Marker>>({});
  const dronePaths = useRef<Record<string, GeoJSON.Feature[]>>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [35.9, 31.95],
      zoom: 7,
    });

    mapInstance.current.on("load", () => {
      mapInstance.current?.addSource("paths", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      mapInstance.current?.addLayer({
        id: "drone-path-layer",
        type: "line",
        source: "paths",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#1d4ed8", "line-width": 3 },
      });
    });

    return () => {
      Object.values(droneMarkers.current).forEach((m) => m.remove());
      mapInstance.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    Object.values(droneMarkers.current).forEach((m) => m.remove());
    droneMarkers.current = {};
    dronePaths.current = {};

    features.forEach((f) => {
      console.log("ffff", f)
      const id = f.properties?.Name;
      if (!id) return;

      const coords = (f.geometry as GeoJSON.Point).coordinates as [number, number];
      const altitude = f.properties?.altitude ?? "N/A";
      const serial = f.properties.serial ?? "N/A";
      const flightTime = f.properties?.flightTime ?? "N/A";
      const yaw = f.properties?.yaw ?? 0;

      const el = document.createElement("div");
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.background = id.startsWith("B") ? "#00ff00" : "#ff0000";
      el.style.borderRadius = "50%";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.transform = `rotate(${yaw}deg)`;
      el.innerHTML = `✈️`;
      el.addEventListener("click", () => setSelectedDroneSerial(id));

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="
          background-color: rgba(0, 0, 0, 0.9);
          color: #fff;
          padding: 12px 16px;
          border-radius: 10px;
          font-family: Arial, sans-serif;
          font-size: 13px;
          min-width: 160px;
        ">
          <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px; text-align: center;">${id}</div>
      
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="color: #aaa;">Altitude:</span>
            <span style="font-weight: 500;">${altitude} m</span>
          </div>
      
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="color: #aaa;">Flight Time:</span>
            <span style="font-weight: 500;">${flightTime}</span>
          </div>
      
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="color: #aaa;">Serial:</span>
            <span style="font-weight: 500;">${serial}</span>
          </div>
      
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #aaa;">Yaw:</span>
            <span style="font-weight: 500;">${yaw}</span>
          </div>
        </div>
      `);
      
      

      const marker = new mapboxgl.Marker(el).setLngLat(coords).setPopup(popup).addTo(mapInstance.current!).togglePopup();
      droneMarkers.current[id] = marker;

      if (!dronePaths.current[id]) dronePaths.current[id] = [];
      dronePaths.current[id].push(f);
    });

    const allPaths = Object.values(dronePaths.current).map((path) => ({
      type: "Feature",
      geometry: { type: "LineString", coordinates: path.map((p) => (p.geometry as GeoJSON.Point).coordinates) },
      properties: {},
    }));

    const pathsSource = mapInstance.current.getSource("paths") as mapboxgl.GeoJSONSource;
    if (pathsSource) pathsSource.setData({ type: "FeatureCollection", features: allPaths });
  }, [features, setSelectedDroneSerial]);

  return <DroneMapHTML mapContainerRef={mapContainer} />;
};

export default DroneMap;
