import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ShipmentDetail from './pages/ShipmentDetail'
import AddShipment from './pages/AddShipment'
import Plans from './pages/Plans'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import PublicView from './pages/PublicView'
import WelcomeModal from './components/WelcomeModal'
import { ChatProvider } from './context/ChatContext'
import { ShipmentsProvider } from './context/ShipmentsContext'

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true)

  return (
    <ShipmentsProvider>
      <ChatProvider>
        {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
        <Routes>
        <Route path="/s/:id" element={<PublicView />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/envio/:id" element={<ShipmentDetail />} />
          <Route path="/agregar" element={<AddShipment />} />
          <Route path="/plan" element={<Plans />} />
          <Route path="/notificaciones" element={<Notifications />} />
          <Route path="/ajustes" element={<Settings />} />
          </Route>
        </Routes>
      </ChatProvider>
    </ShipmentsProvider>
  )
}
