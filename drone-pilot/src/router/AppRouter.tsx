import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreenApp from "../components/WelcomeScreen/WelcomeScreenApp";
import Layout from "../components/Layout/Layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreenApp />} />
        <Route path="/main" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}
