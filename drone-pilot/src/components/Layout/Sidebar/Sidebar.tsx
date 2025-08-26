import type { SidebarHTMLProps } from "../../../types/sidebar.models";
import SidebarHTML from "./SidebarHTML";
import { FaTachometerAlt, FaPaperPlane , FaCog } from "react-icons/fa";


const Sidebar = ({ collapsed, setCollapsed }: SidebarHTMLProps) => {
    const menu = [
        { name: "Dashboard", icon: <FaTachometerAlt /> },
        { name: "Drones", icon: <FaPaperPlane  /> },
        { name: "Settings", icon: <FaCog /> },
      ];
      return <SidebarHTML collapsed={collapsed} menu={menu} setCollapsed={setCollapsed} />;
    };

export default Sidebar;
