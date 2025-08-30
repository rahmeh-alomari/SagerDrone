import type { SidebarHTMLProps } from "../../../types/sidebar.models";
import SidebarHTML from "./SidebarHTML";
import { FaTachometerAlt, FaPaperPlane  } from "react-icons/fa";


const Sidebar = ({ collapsed, setCollapsed }: SidebarHTMLProps) => {
  const menu = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/main" },
    { name: "Chart", icon:<FaPaperPlane />, path: "/chart" },
  ];
      return <SidebarHTML collapsed={collapsed} menu={menu} setCollapsed={setCollapsed} />;
    };

export default Sidebar;
