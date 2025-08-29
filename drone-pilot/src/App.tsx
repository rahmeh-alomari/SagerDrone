import "./App.css";
import { SocketProvider } from "./context/SocketProvider";
import AppRouter from "./router/AppRouter";

function App() {

  return (
    <SocketProvider>
         <AppRouter />

    </SocketProvider>
  );
}

export default App;
