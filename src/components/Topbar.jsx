import { Link, useLocation, useParams } from 'react-router-dom'
import { notifications } from '../data/mockData'
import { useShipments } from '../context/ShipmentsContext'

const TITLES = {
  '/': { title: 'Envíos', subtitle: 'Todo lo que necesitas saber sobre tus paquetes' },
  '/notificaciones': { title: 'Alertas', subtitle: 'Avisos sobre tus envíos, apenas pasan' },
  '/plan': { title: 'Mi plan', subtitle: 'Elige lo que necesitas, cambia cuando quieras' },
  '/ajustes': { title: 'Ajustes', subtitle: 'Tu cuenta y preferencias de aviso' },
  '/agregar': { title: 'Agregar envío', subtitle: 'Conecta una guía para empezar a rastrearla' },
}

export default function Topbar({ onMenuClick }) {
  const location = useLocation()
  const params = useParams()
  const { shipments } = useShipments()
  const unreadCount = notifications.filter((n) => n.unread).length

  let title = TITLES[location.pathname]?.title
  let subtitle = TITLES[location.pathname]?.subtitle

  if (!title && params.id) {
    const shipment = shipments.find((s) => s.id === params.id)
    title = shipment ? shipment.id : 'Detalle del envío'
    subtitle = shipment ? shipment.product : undefined
  }
  if (!title) {
    title = 'RutaClara'
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-paper/90 backdrop-blur px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden -ml-1 rounded-md p-2 text-ink-700 hover:bg-ink-50"
        aria-label="Abrir menú"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="font-display text-lg font-semibold text-ink-900 truncate">{title}</h1>
        {subtitle && <p className="text-sm text-muted truncate hidden sm:block">{subtitle}</p>}
      </div>

      <Link
        to="/notificaciones"
        className="relative rounded-lg p-2 text-ink-700 hover:bg-ink-50"
        aria-label={`Notificaciones${unreadCount ? `, ${unreadCount} sin leer` : ''}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
          <path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 12 6 8Z" strokeLinejoin="round" />
          <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-signal-500 ring-2 ring-paper" />
        )}
      </Link>
    </header>
  )
}
