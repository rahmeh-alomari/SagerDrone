import type { MainContentHTMLProps } from "../../../types/mainContant.models";
import DroneListHTML from "../../DronList/DroneListHtml";



const MainContentHTML = ({ children }: MainContentHTMLProps) => {
  return (
    <div className="flex gap-4 p-4 h-[100%]">
      <div className="w-1/3 bg-gray-800 text-white p-4 rounded-md ">


        
        <DroneListHTML />
      </div>

      <div className="flex-1 h-full">{children}</div>
    </div>
  );
};

export default MainContentHTML;
