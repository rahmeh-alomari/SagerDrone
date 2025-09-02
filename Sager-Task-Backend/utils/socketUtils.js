const socketIO = require("socket.io");

const droneHistory = new Map();

const movementConfig = {
  speed: 0.001,        
  variation: 0.0005,   
  updateInterval: 1000
};

exports.sio = (server) => {
  return socketIO(server, {
    transports: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log(`-> Client ${socket.id} connected`);

    setInterval(function () {
      socket.emit('message', GenerateData());
    }, movementConfig.updateInterval);

    socket.on('control_drone', (data) => {
      handleDroneControl(data);
    });

    socket.on("disconnect", () => {
      console.log(`-> Client ${socket.id} disconnected`);
    });
  });
};

function handleDroneControl(data) {
  const { serial, command, value } = data;
  
  if (droneHistory.has(serial)) {
    const history = droneHistory.get(serial);
    
    switch (command) {
      case 'speed':
        movementConfig.speed = Math.max(0.0001, Math.min(0.005, value));
        break;
        
      case 'direction':
        if (history.length > 0) {
          const lastPos = history[history.length - 1];
          const newPos = calculateNewPosition(lastPos, value);
          history.push(newPos);
          
          if (history.length > 20) history.shift();
        }
        break;
        
      case 'stop':
        console.log(`Drone ${serial} stopped`);
        break;
        
      default:
        console.log(`Unknown : ${command}`);
    }
  }
}

function calculateNewPosition(currentPos, direction) {
  const [lng, lat] = currentPos;
  
  switch (direction) {
    case 'north':
      return [lng, lat + movementConfig.speed];
    case 'south':
      return [lng, lat - movementConfig.speed];
    case 'east':
      return [lng + movementConfig.speed, lat];
    case 'west':
      return [lng - movementConfig.speed, lat];
    case 'northeast':
      return [lng + movementConfig.speed * 0.7, lat + movementConfig.speed * 0.7];
    case 'northwest':
      return [lng - movementConfig.speed * 0.7, lat + movementConfig.speed * 0.7];
    case 'southeast':
      return [lng + movementConfig.speed * 0.7, lat - movementConfig.speed * 0.7];
    case 'southwest':
      return [lng - movementConfig.speed * 0.7, lat - movementConfig.speed * 0.7];
    default:
      return currentPos;
  }
}

function GenerateData() {
  const drones = [];
  
  const drone1 = createDroneWithPath("DRONE001", [35.9, 31.95], "north_straight");
  drones.push(drone1);
  
  const drone2 = createDroneWithPath("DRONE002", [35.85, 31.9], "east_zigzag");
  drones.push(drone2);
  
  const drone3 = createDroneWithPath("DRONE003", [35.95, 32.0], "circle");
  drones.push(drone3);
  
  const drone4 = createDroneWithPath("DRONE004", [35.88, 31.92], "figure8");
  drones.push(drone4);
  
  const drone5 = createDroneWithPath("DRONE005", [35.92, 31.98], "random_walk");
  drones.push(drone5);

  return {
    "type": "FeatureCollection",
    "features": drones
  };
}

function createDroneWithPath(serial, baseLocation, movementType) {
  if (!droneHistory.has(serial)) {
    droneHistory.set(serial, [baseLocation]);
  }
  
  const history = droneHistory.get(serial);
  let newLocation;
  
  switch (movementType) {
    case "north_straight":
      const lastNorth = history[history.length - 1];
      newLocation = [
        lastNorth[0] + (Math.random() * movementConfig.variation * 2 - movementConfig.variation),
        lastNorth[1] + movementConfig.speed
      ];
      break;
      
    case "east_zigzag":
      const lastEast = history[history.length - 1];
      const zigzag = Math.sin(Date.now() / 2000) * movementConfig.variation;
      newLocation = [
        lastEast[0] + movementConfig.speed,
        lastEast[1] + zigzag
      ];
      break;
      
    case "circle":
      const time = Date.now() / 5000;
      const radius = 0.003;
      newLocation = [
        baseLocation[0] + radius * Math.cos(time),
        baseLocation[1] + radius * Math.sin(time)
      ];
      break;
      
    case "figure8":
      const t = Date.now() / 3000;
      const a = 0.002;
      newLocation = [
        baseLocation[0] + a * Math.sin(t),
        baseLocation[1] + a * Math.sin(t) * Math.cos(t)
      ];
      break;
      
    case "random_walk":
      const lastRandom = history[history.length - 1];
      const angle = Math.random() * 2 * Math.PI;
      newLocation = [
        lastRandom[0] + Math.cos(angle) * movementConfig.speed,
        lastRandom[1] + Math.sin(angle) * movementConfig.speed
      ];
      break;
      
    default:
      newLocation = baseLocation;
  }
  
  history.push(newLocation);
  
  if (history.length > 25) {
    history.shift();
  }
  
  return {
    "type": "Feature",
    "properties": {
      "serial": serial,
      "registration": "SD-" + makeID(2),
      "Name": "Dji Mavic " + serial.slice(-3),
      "altitude": Math.floor(Math.random() * 100) + 50,
      "pilot": "Besher",
      "organization": "Sager Drone",
      "yaw": Math.floor(Math.random() * 360),
      "movementType": movementType,
      "speed": movementConfig.speed
    },
    "geometry": {
      "coordinates": newLocation,
      "type": "Point"
    }
  };
}

function makeID(number) {
  const characters = 'ABCD';
  let result = '';

  for (let i = 0; i < number; i++) {
    result += characters.charAt(Math.floor(Math.random() * 4));
  }

  return result;
}

function makeLocation() {
  base = [
    35.93131881204147 + (Math.random() * 2 - 1) / 10,
    31.94878648036645 + (Math.random() * 2 - 1) / 10
  ]
  return base;
}

