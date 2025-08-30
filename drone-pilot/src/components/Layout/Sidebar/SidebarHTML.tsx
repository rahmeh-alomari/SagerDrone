import { useNavigate } from "react-router-dom";
import type { SidebarHTMLProps } from "../../../types/sidebar.models";

const SidebarHTML = ({ collapsed, menu, setCollapsed }: SidebarHTMLProps) => {
  const widthClass = collapsed ? "w-18" : "w-55";
  const navigate = useNavigate();

  return (
    <div className={`h-screen bg-gray-800 text-white flex flex-col ${widthClass}`}>
      <div className="flex justify-end p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-gray-300 focus:outline-none hover:cursor-pointer"
        >
          ☰
        </button>
      </div>
      <ul className="flex-1 mt-4">
        {menu.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.path || "/")} 
            className="flex items-center gap-4 p-3 mx-2 my-1 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
          >
            <div className="text-lg">{item.icon}</div>
            {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
          </li>
        ))}
      </ul>
      {!collapsed && (
        <div className="p-4 text-gray-400 text-xs border-t border-gray-700">
          &copy; 2025 Drone Tracker
        </div>
      )}
    </div>
  );
};

export default SidebarHTML;
