import { useState } from 'react'
import { Link } from 'react-router-dom'
import { notifications as initial } from '../data/mockData'

const TONE_STYLES = {
  signal: { dot: 'bg-signal-500', ring: 'ring-signal-100' },
  amber: { dot: 'bg-amber-500', ring: 'ring-amber-100' },
  teal: { dot: 'bg-teal-500', ring: 'ring-teal-100' },
}

export default function Notifications() {
  const [items, setItems] = useState(initial)
  const unreadCount = items.filter((n) => n.unread).length

  function markAllRead() {
    setItems((list) => list.map((n) => ({ ...n, unread: false })))
  }
  function markRead(id) {
    setItems((list) => list.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted">
          {unreadCount > 0 ? `${unreadCount} sin leer` : 'Estás al día'}
        </p>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm font-medium text-ink-700 hover:text-ink-900">
            Marcar todo como leído
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-dashed border-line">
          <p className="font-display font-semibold text-ink-800">Sin alertas por ahora</p>
          <p className="text-sm text-muted mt-1">Te avisamos aquí apenas pase algo con tus envíos.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((n) => {
            const tone = TONE_STYLES[n.type] ?? TONE_STYLES.teal
            return (
              <li key={n.id}>
                <Link
                  to={n.shipmentId ? `/envio/${n.shipmentId}` : '/'}
                  onClick={() => markRead(n.id)}
                  className={`w-full text-left rounded-xl border p-4 flex items-start gap-3.5 transition-colors hover:border-ink-300 ${
                    n.unread ? 'border-line bg-card' : 'border-line/60 bg-card/60'
                  }`}
                >
                  <span className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${tone.dot} ${n.unread ? '' : 'opacity-40'}`} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${n.unread ? 'text-ink-900' : 'text-ink-700'}`}>{n.title}</p>
                    <p className="text-sm text-muted mt-0.5">{n.body}</p>
                    <p className="text-xs text-muted mt-1.5">{n.time}</p>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 mt-0.5 shrink-0 text-muted">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            )
          })}
        </ul>
      )}

      <Link to="/" className="inline-block mt-6 text-sm font-medium text-ink-700 hover:text-ink-900">
        ← Volver a tus envíos
      </Link>
    </div>
  )
}
