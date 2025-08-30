# Drone Pilot

A real-time drone tracking dashboard built with ReactJS, Mapbox, and WebSocket. The front-end receives live drone data from the backend and shows their paths, statuses, and details.

---

## Features

- Show all drones currently in the sky on the map.
- Track each drone's path from the moment the page opens.
- Color-coded drones: green if registration starts with **B**, red otherwise.
- Hovering on a drone shows flight time and altitude.
- Yaw orientation displayed as an arrow on the drone icon.
- Clicking a drone on the map or in the list focuses/highlights it.
- Red drone counter at the bottom right.
- Responsive and fast, even with many drones.

---

## Requirements

- Node.js >= 20
- npm
- Backend WebSocket server (already provided)
- Mapbox account/token

---

## Installation

```bash
git clone <your-repo-url>
cd drone-pilot
npm install

src/
 ├─ components/   
 ├─ context/     
 ├─ services/     
 ├─ types/      
 ├─ App.tsx
 └─ main.tsx

 
VITE_MAPBOX_TOKEN=pk.eyJ1IjoicmFobWVoOTYiLCJhIjoiY21ldHFqN2F0MDF2bDJvczhlcDZqbjl2MiJ9.sBfa_Qb3RcuM_atotyjfMA
