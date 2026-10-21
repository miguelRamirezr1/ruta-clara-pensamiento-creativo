import { createContext, useContext, useState, useCallback } from 'react'
import { shipments as seed, carriers } from '../data/mockData'

const ShipmentsContext = createContext(null)

// Datos en memoria: se siembran desde mockData en cada carga. No hay backend
// (es una demo); reiniciar por carga evita que un usuario de prueba vea los
// pedidos que creó el anterior durante el experimento.

function nowStamp() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

function genId() {
  return `RC-${Math.floor(Math.random() * 900000 + 100000)}`
}

export function ShipmentsProvider({ children }) {
  const [shipments, setShipments] = useState(seed)

  const addShipment = useCallback(({ carrier, carrierName, guide, product, destination }) => {
    const id = (guide || '').trim().toUpperCase().replace(/\s+/g, '') || genId()
    const carrierLabel = carriers[carrier]?.name ?? carrierName?.trim() ?? 'tu transportadora'
    const stamp = nowStamp()
    const shipment = {
      id,
      carrier: carrier || 'otra',
      carrierName: carrier === 'otra' ? carrierName?.trim() || 'Otra transportadora' : undefined,
      status: 'transito',
      origin: 'En preparación',
      destination: destination?.trim() || 'Colombia',
      product: product?.trim() || 'Pedido nuevo',
      client: null,
      causeKnown: false,
      cause: null,
      causeSimple: null,
      etaMin: 2,
      etaMax: 4,
      etaConfidence: 'media',
      nextSteps: [],
      timeline: [
        { date: stamp, label: 'Pedido registrado en RutaClara', tone: 'teal' },
        { date: stamp, label: `Conectado con ${carrierLabel} — empezamos a rastrear`, tone: 'ink' },
      ],
      sharedWithClient: false,
    }
    setShipments((list) => [shipment, ...list])
    return shipment
  }, [])

  const toggleStep = useCallback((id, index) => {
    setShipments((list) =>
      list.map((s) =>
        s.id === id
          ? { ...s, nextSteps: s.nextSteps.map((st, i) => (i === index ? { ...st, done: !st.done } : st)) }
          : s
      )
    )
  }, [])

  // Resolución de una retención: una sola acción del usuario la destraba.
  const resolveRetention = useCallback((id) => {
    setShipments((list) =>
      list.map((s) => {
        if (s.id !== id) return s
        const stamp = nowStamp()
        return {
          ...s,
          status: 'transito',
          resolved: true,
          etaMin: 1,
          etaMax: 2,
          etaConfidence: 'alta',
          nextSteps: s.nextSteps.map((st) => ({ ...st, done: true })),
          timeline: [
            ...s.timeline,
            { date: stamp, label: 'Documento enviado a la DIAN', tone: 'ink' },
            { date: stamp, label: 'Retención resuelta — envío liberado', tone: 'teal' },
          ],
        }
      })
    )
  }, [])

  return (
    <ShipmentsContext.Provider value={{ shipments, addShipment, toggleStep, resolveRetention }}>
      {children}
    </ShipmentsContext.Provider>
  )
}

export function useShipments() {
  const ctx = useContext(ShipmentsContext)
  if (!ctx) throw new Error('useShipments debe usarse dentro de ShipmentsProvider')
  return ctx
}
