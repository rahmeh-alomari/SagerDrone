import { useContext, useState, useEffect } from "react";
import useDroneList from "./DroneList";
import { SocketContext } from "../../context/SocketContext";

const DroneListHTML = () => {
  const { drones } = useDroneList();
  const { selectedDroneSerial, setSelectedDroneSerial } = useContext(SocketContext);

  const [cards, setCards] = useState<typeof drones>([]);

  useEffect(() => {
    if (drones.length > 0) {
      drones.forEach(d => {
        const lastCard = cards.slice().reverse().find(c => c.serial === d.serial);
        if (!lastCard || lastCard.registration !== d.registration) {
          setCards(prev => [...prev, d]);
        }
      });
    }
  }, [drones, cards]);

  return (
<div className="bg-black text-white rounded-md h-[100%] flex flex-col overflow-hidden">
<div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">DRONE FLYING</h2>
        <div className="flex space-x-4 mt-2 text-sm">
          <span className="border-b-2 border-red-500">Drones</span>
          <span className="text-gray-400">Flights History</span>
        </div>
      </div>

      {cards.length > 0 ? (
        <ul className="max-h-[500px] overflow-y-auto">
          {cards.map((d, index) => {
            const isSelected = d.serial === selectedDroneSerial;

            return (
              <li
                key={`${d.serial}-${index}-${Date.now()}`}
                className={`flex justify-between items-center p-3 border-b border-gray-700 cursor-pointer
                  transition-colors duration-200
                  ${isSelected ? "bg-white text-black" : "bg-gray-900 hover:bg-gray-700"}`}
                onClick={() => setSelectedDroneSerial(d.serial)}
              >
                <div>
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-xs text-gray-400">Serial #: {d.serial}</div>
                  <div className="text-xs text-gray-400">Registration #: {d.registration}</div>
                  <div className="text-xs">Pilot: {d.pilot}</div>
                  <div className="text-xs">Organization: {d.org}</div>
                </div>

                <div
                  className={`w-3 h-3 rounded-full ${d.canFly ? "bg-green-500" : "bg-red-500"}`}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="p-4 text-gray-400">No drones currently</p>
      )}

      <div className="p-3 text-right text-sm text-red-400 border-t border-gray-700">
        total drone cards: {cards.length}
      </div>
    </div>
  );
};

export default DroneListHTML;
