import { Link, useParams } from 'react-router-dom'
import { shipments, carriers } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import Timeline from '../components/Timeline'

export default function PublicView() {
  const { id } = useParams()
  const shipment = shipments.find((s) => s.id.toLowerCase() === id?.toLowerCase())

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="border-b border-line bg-card">
        <div className="max-w-2xl mx-auto px-5 h-16 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-signal-500 flex items-center justify-center font-display font-semibold text-sm text-white">
            RC
          </div>
          <span className="font-display font-semibold text-lg text-ink-900">RutaClara</span>
          <span className="ml-auto text-xs text-muted">Vista compartida</span>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-8">
        {!shipment ? (
          <p className="text-center text-muted py-16">No encontramos este envío.</p>
        ) : (
          <>
            <p className="text-sm text-muted mb-1">Estado de tu pedido</p>
            <h1 className="font-display text-2xl font-semibold text-ink-900 mb-4">{shipment.product}</h1>
            <div className="flex items-center gap-2.5 mb-6">
              <StatusBadge status={shipment.status} />
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-md"
                style={{ backgroundColor: `${carriers[shipment.carrier].color}1A`, color: carriers[shipment.carrier].color }}
              >
                {carriers[shipment.carrier].name}
              </span>
              <span className="font-mono text-xs text-muted">{shipment.id}</span>
            </div>

            {shipment.status === 'retenido' && shipment.causeKnown && (
              <div className="rounded-lg bg-signal-50 border border-signal-100 p-4 mb-5">
                <p className="text-sm font-medium text-signal-700 mb-1">Por qué está retenido</p>
                <p className="text-sm text-ink-900 leading-relaxed">{shipment.causeSimple}</p>
              </div>
            )}

            {shipment.etaMin != null && shipment.status === 'retenido' && (
              <div className="rounded-lg border border-line bg-card p-4 mb-5">
                <p className="text-sm text-muted mb-1">Tiempo estimado de solución</p>
                <p className="font-display text-2xl font-semibold text-ink-900">
                  {shipment.etaMin}–{shipment.etaMax} días
                </p>
              </div>
            )}

            <div className="rounded-xl border border-line bg-card p-5">
              <h3 className="font-display font-semibold text-ink-900 mb-4">Seguimiento</h3>
              <Timeline events={shipment.timeline} />
            </div>

            <p className="text-center text-xs text-muted mt-8">
              Esta información se actualiza en tiempo real, la misma que ve quien gestiona tu envío.
            </p>
          </>
        )}

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-muted hover:text-ink-700 underline">
            Ir a RutaClara
          </Link>
        </div>
      </main>
    </div>
  )
}
