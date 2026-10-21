import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useShipments } from '../context/ShipmentsContext'
import ShipmentCard from '../components/ShipmentCard'

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'retenido', label: 'Retenidos' },
  { id: 'transito', label: 'En tránsito' },
  { id: 'entregado', label: 'Entregados' },
]

export default function Dashboard() {
  const { shipments } = useShipments()
  const [filter, setFilter] = useState('todos')
  const [query, setQuery] = useState('')

  const retenidos = shipments.filter((s) => s.status === 'retenido')
  const necesitanAccion = retenidos.filter((s) =>
    s.nextSteps.some((step) => step.ownerAction && !step.done)
  )
  const urgente = necesitanAccion[0] ?? retenidos[0]

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchesFilter = filter === 'todos' || s.status === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        s.id.toLowerCase().includes(q) ||
        s.product.toLowerCase().includes(q) ||
        (s.client ?? '').toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <div>
      {retenidos.length > 0 && (
        <div className="mb-6 rounded-xl border border-signal-100 bg-signal-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="h-9 w-9 shrink-0 rounded-full bg-signal-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-4.5 w-4.5">
              <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
              <path d="M10.3 3.9 2.6 18a1.5 1.5 0 0 0 1.3 2.2h16.2a1.5 1.5 0 0 0 1.3-2.2L13.7 3.9a1.5 1.5 0 0 0-2.6 0Z" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm text-ink-900 flex-1">
            Tienes <strong>{retenidos.length} {retenidos.length === 1 ? 'envío retenido' : 'envíos retenidos'}</strong>
            {necesitanAccion.length > 0 && (
              <> — <strong>{necesitanAccion.length}</strong> {necesitanAccion.length === 1 ? 'necesita' : 'necesitan'} una acción tuya para avanzar.</>
            )}
          </p>
          <Link
            to={`/envio/${urgente.id}`}
            className="shrink-0 text-sm font-semibold text-signal-600 hover:text-signal-700"
          >
            Ver el más urgente →
          </Link>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-900">Mis pedidos</h2>
          <p className="text-sm text-muted">{shipments.length} en total</p>
        </div>
        <Link
          to="/agregar"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-ink-800 text-white px-4 py-2.5 text-sm font-semibold hover:bg-ink-700 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-4 w-4">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Agregar pedido
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-thin -mx-1 px-1">
          {FILTERS.map((f) => {
            const count = f.id === 'todos' ? shipments.length : shipments.filter((s) => s.status === f.id).length
            const active = filter === f.id
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-ink-800 text-white'
                    : 'bg-white text-ink-700 border border-line hover:border-ink-300'
                }`}
              >
                {f.label} <span className={active ? 'text-ink-300' : 'text-muted'}>{count}</span>
              </button>
            )
          })}
        </div>

        <div className="relative sm:ml-auto sm:w-64">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por guía o producto…"
            className="w-full rounded-lg border border-line bg-white pl-9 pr-3 py-2 text-sm text-ink-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink-300"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-dashed border-line">
          <p className="font-display font-semibold text-ink-800">No encontramos envíos</p>
          <p className="text-sm text-muted mt-1">Prueba con otro filtro o busca por número de guía.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <ShipmentCard key={s.id} shipment={s} />
          ))}
        </div>
      )}
    </div>
  )
}
