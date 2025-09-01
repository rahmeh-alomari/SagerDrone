import mapboxgl from "mapbox-gl";

export const addDroneLayers = (map: mapboxgl.Map) => {
  map.addSource("drones", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  map.addLayer({
    id: "drone-paths",
    type: "line",
    source: "drones",
    filter: ["==", ["get", "featureType"], "path"],
    paint: {
      "line-color": "#facc15",
      "line-width": 2,
      "line-opacity": 0.8,
    },
  });

  map.addLayer({
    id: "drone-points",
    type: "circle",
    source: "drones",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-radius": 12,
      "circle-color": "#ef4444",
      "circle-stroke-width": 1,
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
      "text-size": 14,
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