import { useEffect, useRef, useContext, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DroneMapHTML from "./DroneMapHTML";
import type { DroneMapProps } from "../../types/Drone.model";
import { environment } from "../../environments/environment";
import { SocketContext } from "../../context/SocketContext";
import type { Feature } from "../../types/features.model";
import { addDroneLayers } from "../../hooks/DroneLayers";
import { showDronePopup } from "../../hooks/DronePopup";



mapboxgl.accessToken = environment.VITE_MAPBOX_TOKEN;

const DroneMap = ({ features }: DroneMapProps) => {
  const { setSelectedDroneSerial } = useContext(SocketContext);

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [paths, setPaths] = useState<Record<string, [number, number][]>>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [35.9, 31.95],
      zoom: 7,
    });

    map.on("load", () => {
      addDroneLayers(map);

      map.on("click", "drone-circles", (e) => {
        const props = e.features?.[0]?.properties;
        if (!props) return;

        setSelectedDroneSerial(props.serial || props.Name);
        showDronePopup(map, e);
      });
    });

    mapInstance.current = map;
    return () => map.remove();
  }, [setSelectedDroneSerial]);

  useEffect(() => {
    if (!mapInstance.current) return;
    const source = mapInstance.current.getSource("drones") as mapboxgl.GeoJSONSource;
    if (!source) return;

    const newPaths = { ...paths };
    const droneFeatures: Feature[] = features.map((f) => {
      const id = f.properties.serial || f.properties.Name;
      if (!newPaths[id]) newPaths[id] = [];

      if (f.geometry.type === "Point") {
        newPaths[id].push(f.geometry.coordinates as [number, number]);
      } else if (f.geometry.type === "LineString") {
        newPaths[id].push(...(f.geometry.coordinates as [number, number][]));
      }

      return {
        type: "Feature",
        geometry: f.geometry,
        properties: { ...f.properties, featureType: "drone" },
      };
    });

    const pathFeatures: GeoJSON.Feature[] = Object.keys(newPaths).map((id) => ({
      type: "Feature",
      geometry: { type: "LineString", coordinates: newPaths[id] },
      properties: { featureType: "path", droneId: id },
    }));

    source.setData({
      type: "FeatureCollection",
      features: [...droneFeatures, ...pathFeatures],
    });

    setPaths(newPaths);
  }, [features]);

  return <DroneMapHTML mapContainerRef={mapContainer} />;
};

export default DroneMap;
