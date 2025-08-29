import { useNavigate } from "react-router-dom";
import WelcomeHtml from "./WelcomeHtml";

export default function WelcomeScreenApp() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/main"); 
  };

  return <WelcomeHtml enterSite={handleEnter} />;
}
