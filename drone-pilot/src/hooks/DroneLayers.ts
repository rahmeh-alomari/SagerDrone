import mapboxgl from "mapbox-gl";

export const addDroneLayers = (map: mapboxgl.Map) => {
  map.addSource("drones", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  map.addSource("drone-paths", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });

  map.addLayer({
    id: "drone-paths-shadow",
    type: "line",
    source: "drone-paths",
    paint: {
      "line-color": "#dc2626",
      "line-width": 8,
      "line-opacity": 0.5, 
    },
  });

  map.addLayer({
    id: "drone-paths",
    type: "line",
    source: "drone-paths",
    paint: {
      "line-color": "#ef4444", 
      "line-width": 6,
      "line-opacity": 1, 
      "line-dasharray": [2, 2],
    },
  });

  map.addLayer({
    id: "drone-paths-pattern",
    type: "line",
    source: "drone-paths",
    paint: {
      "line-color": "#fca5a5", 
      "line-width": 3, 
      "line-opacity": 0.9, 
      "line-dasharray": [1, 3], 
    },
  });

  map.addLayer({
    id: "drone-paths-old",
    type: "line",
    source: "drones",
    filter: ["==", ["get", "featureType"], "path"],
    paint: {
      "line-color": "#ef4444", 
      "line-width": 6, 
      "line-opacity": 1, 
      "line-dasharray": [2, 2], 
    },
  });

  map.addLayer({
    id: "drone-points",
    type: "circle",
    source: "drones",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-radius": 15, 
      "circle-color": "#ef4444",
      "circle-stroke-width": 3, 
      "circle-stroke-color": "#fff",
    },
  });

  map.addLayer({
    id: "drone-icons",
    type: "symbol",
    source: "drones",
    filter: ["!", ["has", "point_count"]],
    layout: {
      "text-field": "✈️",
      "text-size": 18, 
      "text-allow-overlap": true,
      "text-ignore-placement": true,
    },
  });

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "drones",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": "#ff9900",
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 500, 40],
      "circle-opacity": 0.6,
    },
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "drones",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });
};