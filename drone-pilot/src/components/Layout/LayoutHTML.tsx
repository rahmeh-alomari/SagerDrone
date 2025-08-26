import type { LayoutHTMLProps } from "../../types/layout.models";
import Header from "./Header/Header";
import MainContent from "./MainContent/MainContent";
import Sidebar from "./Sidebar/Sidebar";

const LayoutHTML = ({ collapsed, setCollapsed, children }: LayoutHTMLProps) => {
    return (
        <div className="flex h-screen">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                menu={[]}
            />      <div className="flex-1 flex flex-col">
                <Header />
                <MainContent>{children}</MainContent>
            </div>
        </div>
    );
};

export default LayoutHTML;
