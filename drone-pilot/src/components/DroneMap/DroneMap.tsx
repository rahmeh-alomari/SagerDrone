import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import DroneMapHTML from "./DroneMapHTML";
import { environment } from "../../environments/environment";
import type { DroneMapProps } from "../../types/Drone.model";

mapboxgl.accessToken = environment.VITE_MAPBOX_TOKEN;



const DroneMap = ({ features }: DroneMapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [31.9488, 35.9313],
        zoom: 5,
      });
    }

    markers.current.forEach(m => m.remove());
    markers.current = [];

    features.forEach(f => {
      const el = document.createElement("div");
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = f.properties.registration.startsWith("B") ? "green" : "red";

      const marker = new mapboxgl.Marker(el)
        .setLngLat([f.geometry.coordinates[1], f.geometry.coordinates[0]])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${f.properties.Name}</strong><br/>
             Altitude: ${f.properties.altitude}m<br/>
             Yaw: ${f.properties.yaw}`
          )
        )
        .addTo(mapInstance.current!);

      markers.current.push(marker);
    });
  }, [features]);

  return <DroneMapHTML mapContainerRef={mapContainer} />;
};

export default DroneMap;
