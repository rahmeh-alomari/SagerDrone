
import './App.css'
import Layout from './components/Layout/Layout'
import { SocketProvider } from './context/SocketProvider'
function App() {

  return (
    <SocketProvider>
      <Layout>
        <div className="text-center text-gray-700">
        </div>
      </Layout>
    </SocketProvider>

  )
}

export default App
