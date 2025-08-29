import { FaRocket, FaExclamationTriangle, FaSatellite, FaPizzaSlice, FaDizzy } from "react-icons/fa";
import DroneImg from "../../assets/Drone-preview.png";

interface Props {
    enterSite: () => void;
}

export default function WelcomeHtml({ enterSite }: Props) {
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950 flex flex-col items-center justify-center text-white">
        <div className="absolute w-full h-full">
          {[...Array(30)].map((_, i) => (
            <div key={i} className={`absolute bg-white rounded-full opacity-50 animate-pulse`} 
                 style={{
                   width: `${Math.random()*3+1}px`,
                   height: `${Math.random()*3+1}px`,
                   top: `${Math.random()*100}%`,
                   left: `${Math.random()*100}%`
                 }} />
          ))}
        </div>
      
        <div className="relative z-10 animate-bounce-slow">
          <img src={DroneImg} 
               className="w-70 h-55 drop-shadow-[0_0_30px_rgba(0,255,255,0.7)]" />
               
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-center text-cyan-400 text-sm opacity-70 animate-pulse">
            GPS Certified 🛰️
          </div>
        </div>
      
        <h1 className="text-5xl md:text-6xl font-extrabold mt-10 animate-fade-in">🛸 Welcome, Commander</h1>
        <p className="text-gray-300 mt-4 text-lg md:text-xl max-w-lg text-center animate-fade-in delay-200">
        You've just taken off into our site.<br />
        Buckle up, keep your snacks safe <FaPizzaSlice className="inline text-yellow-400"/> 
          , and get ready for <span className="text-blue-400 font-semibold">Mission Control</span>.
        </p>
      
        <button
          onClick={enterSite}
          className="mt-10 px-12 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
                     rounded-full font-bold text-black text-lg uppercase shadow-lg
                     hover:scale-110 hover:shadow-[0_0_40px_rgba(0,255,255,0.8)]
                     transition-all duration-300 flex items-center gap-3 justify-center cursor-pointer animate-fade-in delay-400"
        >
          Enter Site <FaRocket className="inline text-blue-400"/>
        </button>
      
        <p className="mt-10 text-gray-500 text-sm flex items-center justify-center gap-2 animate-fade-in delay-600">
          <FaExclamationTriangle className="inline text-yellow-400"/> No drones were harmed… Some might have gotten dizzy  <FaDizzy className="inline text-yellow-400"/>
        </p>
      </div>
      
    );
}
