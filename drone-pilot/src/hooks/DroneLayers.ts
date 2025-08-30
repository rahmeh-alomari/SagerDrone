import mapboxgl from "mapbox-gl";

export const addDroneLayers = (map: mapboxgl.Map) => {
  map.addSource("drones", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });

  map.addLayer({
    id: "drone-paths",
    type: "line",
    source: "drones",
    filter: ["==", ["get", "featureType"], "path"],
    paint: {
      "line-color": "#facc15",
      "line-width": 3,
      "line-opacity": 0.9,
    },
  });

  map.addLayer({
    id: "drone-circles",
    type: "circle",
    source: "drones",
    filter: ["==", ["get", "featureType"], "drone"],
    paint: {
      "circle-radius": 16,
      "circle-color": [
        "case",
        ["==", ["slice", ["get", "Name"], 0, 1], "B"],
        "#22c55e", 
        "#ef4444",
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  });

  map.addLayer({
    id: "drone-inside",
    type: "symbol",
    source: "drones",
    filter: ["==", ["get", "featureType"], "drone"],
    layout: {
      "text-field": "✈️",
      "text-size": 16,
      "text-allow-overlap": true,
    },
  });
};
