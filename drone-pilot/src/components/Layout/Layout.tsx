import { useState } from "react";
import LayoutHTML from "./LayoutHTML";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <LayoutHTML collapsed={collapsed} setCollapsed={setCollapsed}>
      {children}
    </LayoutHTML>
  );
};

export default Layout;
