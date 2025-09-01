import { useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DroneMapHTML from "./DroneMapHTML";
import { environment } from "../../environments/environment";
import { SocketContext } from "../../context/SocketContext";
import { addDroneLayers } from "../../hooks/DroneLayers";
import { showDronePopup } from "../../hooks/DronePopup";

mapboxgl.accessToken = environment.VITE_MAPBOX_TOKEN;

const DroneMap = () => {
  const { features, setSelectedDroneSerial } = useContext(SocketContext);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

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

      map.on("click", "drone-points", (e) => {
        const feature = e.features?.[0];
        if (!feature || feature.properties?.point_count) return; 
        setSelectedDroneSerial(feature.properties?.serial || feature.properties?.Name);
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

    source.setData({ type: "FeatureCollection", features: features.map(f => ({
      type: "Feature",
      geometry: f.geometry,
      properties: { ...f.properties, featureType: "drone" },
    }))});
  }, [features]);

  return <DroneMapHTML mapContainerRef={mapContainer} />;
};

export default DroneMap;