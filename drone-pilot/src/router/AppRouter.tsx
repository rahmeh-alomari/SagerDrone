import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreenApp from "../components/WelcomeScreen/WelcomeScreenApp";
import Layout from "../components/Layout/Layout";
import DroneSidebar from "../components/DroneChart/DroneChart";
import MainContent from "../components/Layout/MainContent/MainContent";
import { SocketProvider } from "../context/SocketProvider";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<WelcomeScreenApp />} />
          <Route path="/" element={<Layout />}>
            <Route path="chart" element={<DroneSidebar />} />
            <Route path="main" element={<MainContent />} />
          </Route>
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}
