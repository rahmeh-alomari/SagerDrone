import { SocketProvider } from "../../context/SocketProvider";
import type { LayoutHTMLProps } from "../../types/layout.models";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const LayoutHTML = ({ collapsed, setCollapsed }: LayoutHTMLProps) => {
    return (
        <SocketProvider>
            <div className="flex h-screen">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} menu={[]} />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <div className="flex-1 p-4  h-[85%]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </SocketProvider>
    );
};

export default LayoutHTML;
