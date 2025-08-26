import type { MainContentHTMLProps } from "../../../types/mainContant.models";

  
  const MainContentHTML = ({ children }: MainContentHTMLProps) => {
    return <div className="flex-1 p-4 overflow-auto">{children}</div>;
  };
  export default MainContentHTML;
