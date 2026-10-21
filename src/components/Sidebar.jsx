import { NavLink } from 'react-router-dom'
import { user, notifications } from '../data/mockData'

const NAV_ITEMS = [
  { to: '/', label: 'Envíos', icon: BoxIcon, end: true },
  { to: '/notificaciones', label: 'Alertas', icon: BellIcon },
  { to: '/plan', label: 'Mi plan', icon: CardIcon },
  { to: '/ajustes', label: 'Ajustes', icon: GearIcon },
]

export default function Sidebar({ open, onClose }) {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 shrink-0 bg-ink-800 text-white flex flex-col transform transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
          <div className="h-8 w-8 rounded-lg bg-signal-500 flex items-center justify-center font-display font-semibold text-sm">
            RC
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">RutaClara</span>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1" aria-label="Navegación principal">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-ink-200 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="flex items-center gap-3">
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {label}
              </span>
              {label === 'Alertas' && unreadCount > 0 && (
                <span className="rounded-full bg-signal-500 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-5">
          <NavLink
            to="/agregar"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white text-ink-800 px-3 py-2.5 text-sm font-semibold hover:bg-ink-100 transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            Agregar envío
          </NavLink>
        </div>

        <div className="px-5 py-4 border-t border-white/10 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-signal-500/90 flex items-center justify-center text-xs font-semibold">
            {user.avatarInitials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-ink-300 truncate">{user.roleLabel}</p>
          </div>
        </div>
      </aside>
    </>
  )
}

function BoxIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M21 8 12 3 3 8l9 5 9-5Z" strokeLinejoin="round" />
      <path d="M3 8v8l9 5 9-5V8" strokeLinejoin="round" />
      <path d="M12 13v8" />
    </svg>
  )
}
function BellIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 12 6 8Z" strokeLinejoin="round" />
      <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
    </svg>
  )
}
function CardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 10h18" />
    </svg>
  )
}
function GearIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z" strokeLinejoin="round" />
    </svg>
  )
}
function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
