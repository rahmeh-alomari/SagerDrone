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
  const { features, dronePaths, highlightedPath, setSelectedDroneSerial } = useContext(SocketContext);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    console.log("Features ", features.length);
    console.log("Drone paths ", dronePaths.length);
    if (dronePaths.length > 0) {
      console.log("First path ", dronePaths[0].geometry.coordinates);
    }
  }, [features, dronePaths]);

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

      const animatePaths = () => {
        try {
          if (map.getLayer("drone-paths")) {
            const time = Date.now() / 100;
            const dash1 = Math.max(1, (time % 6) + 2);
            const dash2 = Math.max(1, 8 - dash1);
            
            map.setPaintProperty("drone-paths", "line-dasharray", [dash1, dash2]);
          }
          
          if (map.getLayer("drone-paths-pattern")) {
            const time = Date.now() / 100;
            const dash1 = Math.max(1, (time % 8) + 1);
            const dash2 = Math.max(1, 6 - dash1);
            
            map.setPaintProperty("drone-paths-pattern", "line-dasharray", [dash1, dash2]);
          }
        } catch (error) {
          console.log("Animation :", error);
        }
        
        animationRef.current = requestAnimationFrame(animatePaths);
      };
      animatePaths();
    });

    mapInstance.current = map;
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      map.remove();
    };
  }, [setSelectedDroneSerial]);

  useEffect(() => {
    if (!mapInstance.current) return;
    
    
    const droneSource = mapInstance.current.getSource("drones");
    if (droneSource && droneSource.type === "geojson") {
      (droneSource as unknown as { setData: (data: any) => void }).setData({ 
        type: "FeatureCollection", 
        features: features.map(f => ({
          type: "Feature",
          geometry: f.geometry,
          properties: { ...f.properties, featureType: "drone" },
        }))
      });
    }

    const pathSource = mapInstance.current.getSource("drone-paths");
    if (pathSource && pathSource.type === "geojson") {
      (pathSource as unknown as { setData: (data: any) => void }).setData({ 
        type: "FeatureCollection", 
        features: dronePaths 
      });
    }

    if (highlightedPath) {
      if (mapInstance.current.getLayer("drone-paths")) {
        mapInstance.current.setPaintProperty("drone-paths", "line-width", 8);
        mapInstance.current.setPaintProperty("drone-paths", "line-color", "#dc2626");
      }
    } else {
      if (mapInstance.current.getLayer("drone-paths")) {
        mapInstance.current.setPaintProperty("drone-paths", "line-width", 6);
        mapInstance.current.setPaintProperty("drone-paths", "line-color", "#ef4444");
      }
    }
  }, [features, dronePaths, highlightedPath]);

  return <DroneMapHTML mapContainerRef={mapContainer} />;
};

export default DroneMap;