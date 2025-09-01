
import mapboxgl from "mapbox-gl";

export const showDronePopup = (map: mapboxgl.Map, e: mapboxgl.MapMouseEvent) => {
  const props = e.features?.[0]?.properties;
  if (!props) return;

  new mapboxgl.Popup({ offset: 15, className: "drone-popup" })
    .setLngLat(e.lngLat)
    .setHTML(`
      <div style="
        font-family: Arial, sans-serif;
        font-size: 13px;
        background: rgba(0,0,0,0.85);
        color: #fff;
        padding: 12px 16px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        min-width: 180px;
      ">
        <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; text-align: center; color: #facc15;">
          ${props.Name}
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span style="color: #aaa;">Altitude:</span>
          <span style="font-weight: 500;">${props.altitude} m</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span style="color: #aaa;">Serial:</span>
          <span style="font-weight: 500;">${props.serial}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #aaa;">Yaw:</span>
          <span style="font-weight: 500;">${props.yaw}</span>
        </div>
      </div>
    `)
    .addTo(map);
};