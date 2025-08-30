export interface MenuItem {
    path: string;
    name: string;
    icon: React.ReactNode;
}
export interface SidebarHTMLProps {
    collapsed: boolean;
    menu: MenuItem[];
    setCollapsed: (value: boolean) => void;
}
