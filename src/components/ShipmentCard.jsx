import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { carriers } from '../data/mockData'

export default function ShipmentCard({ shipment }) {
  const carrier = carriers[shipment.carrier]

  return (
    <Link
      to={`/envio/${shipment.id}`}
      className="group block rounded-xl border border-line bg-card p-5 shadow-card transition-all hover:shadow-pop hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <StatusBadge status={shipment.status} />
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md"
          style={{ backgroundColor: `${carrier.color}1A`, color: carrier.color }}
        >
          {carrier.name}
        </span>
      </div>

      <p className="mt-3 font-mono text-sm text-ink-700 tracking-tight">{shipment.id}</p>
      <p className="mt-1 font-display font-semibold text-ink-900 leading-snug line-clamp-2">
        {shipment.product}
      </p>

      <div className="mt-4 pt-4 border-t border-line">
        {shipment.status === 'retenido' && (
          <p className="text-sm text-ink-700">
            {shipment.causeKnown ? (
              <>
                <span className="font-medium text-signal-600">Causa: </span>
                {shipment.causeSimple.length > 70
                  ? shipment.cause
                  : shipment.causeSimple}
              </>
            ) : (
              <span className="text-amber-600 font-medium">Averiguando la causa…</span>
            )}
          </p>
        )}
        {shipment.status === 'transito' && (
          <p className="text-sm text-teal-600 font-medium">
            Llega en {shipment.etaMin}–{shipment.etaMax} días
          </p>
        )}
        {shipment.status === 'entregado' && (
          <p className="text-sm text-muted">Entrega completada</p>
        )}
      </div>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink-800 group-hover:gap-1.5 transition-all">
        Ver detalle
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}
