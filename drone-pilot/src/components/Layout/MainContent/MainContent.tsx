import type { MainContentProps } from "../../../types/mainContant.models";
import MainContentHTML from "./MainContentHTML";


const MainContent = ({ children }: MainContentProps) => {
  return <MainContentHTML>{children}</MainContentHTML>;
};

export default MainContent;
