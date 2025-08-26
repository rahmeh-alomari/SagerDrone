import type { HeaderHTMLProps } from "../../../types/header.models";

  
  const HeaderHTML = ({ user }: HeaderHTMLProps) => {
    return (
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white transition-width duration-300">
        <h1 className="text-xl font-bold">Drone Tracker</h1>
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-right">
            <span>Hello / {user.name}</span>
            <span className="text-sm text-gray-300">{user.position}</span>
          </div>
          <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white" />
        </div>
      </div>
    );
  };
  
  export default HeaderHTML;
  