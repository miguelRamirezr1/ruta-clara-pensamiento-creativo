import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { resolveCarrier } from '../data/mockData'
import { useShipments } from '../context/ShipmentsContext'
import StatusBadge from '../components/StatusBadge'
import Timeline from '../components/Timeline'
import { useChat } from '../context/ChatContext'

export default function ShipmentDetail() {
  const { id } = useParams()
  const { shipments, toggleStep, resolveRetention } = useShipments()
  const shipment = shipments.find((s) => s.id === id)
  const { setOpen: openChat } = useChat()
  const [shared, setShared] = useState(shipment?.sharedWithClient ?? false)
  const [copied, setCopied] = useState(false)

  if (!shipment) {
    return (
      <div className="text-center py-16">
        <p className="font-display font-semibold text-ink-800">No encontramos ese envío</p>
        <Link to="/" className="text-sm font-medium text-ink-600 underline mt-2 inline-block">
          Volver a tus envíos
        </Link>
      </div>
    )
  }

  const carrier = resolveCarrier(shipment)
  const completedSteps = shipment.nextSteps.filter((s) => s.done).length
  const totalSteps = shipment.nextSteps.length
  const ownerStep = shipment.nextSteps.find((s) => s.ownerAction && !s.done)
  const isRetenido = shipment.status === 'retenido'

  function copyLink() {
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink-800 mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
          <path d="M11 6 5 12l6 6M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Todos los envíos
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <StatusBadge status={shipment.status} />
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-md"
              style={{ backgroundColor: `${carrier.color}1A`, color: carrier.color }}
            >
              {carrier.name}
            </span>
          </div>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink-900">{shipment.product}</h2>
          <p className="font-mono text-sm text-muted mt-1">
            {shipment.id} · {shipment.origin} → {shipment.destination}
          </p>
        </div>
        <button
          onClick={() => openChat(true)}
          className="shrink-0 rounded-lg border border-ink-800 text-ink-800 px-4 py-2 text-sm font-semibold hover:bg-ink-800 hover:text-white transition-colors"
        >
          Hablar con una persona real
        </button>
      </div>

      {/* Bloque principal: lo primero que ve el usuario, en todos los tamaños. */}
      {shipment.resolved && (
        <section className="mb-5 rounded-xl border border-teal-200 bg-teal-50 p-5 flex items-start gap-3">
          <span className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-teal-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="h-4 w-4">
              <path d="m5 12 5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h3 className="font-display font-semibold text-ink-900">Retención resuelta</h3>
            <p className="text-sm text-ink-700 mt-0.5">
              Enviamos tu documento a la DIAN y el envío quedó liberado. Sigue en camino
              {shipment.etaMin != null && <> — llega en {shipment.etaMin}–{shipment.etaMax} días</>}.
            </p>
          </div>
        </section>
      )}

      {isRetenido && (
        <section className="mb-5 rounded-xl border border-signal-100 bg-signal-50 p-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-signal-600 mb-1">Retención</p>
              {shipment.causeKnown ? (
                <p className="text-sm text-ink-900 leading-relaxed">{shipment.causeSimple}</p>
              ) : (
                <p className="text-sm text-ink-900 leading-relaxed">
                  Todavía estamos confirmando la causa exacta con {carrier.name}. Te avisamos apenas la
                  tengamos — no necesitas volver a preguntar.
                </p>
              )}
            </div>
            {shipment.etaMin != null && (
              <div className="sm:text-right shrink-0">
                <p className="text-xs text-muted">Tiempo estimado</p>
                <p className="font-display text-2xl font-semibold text-ink-900">
                  {shipment.etaMin}–{shipment.etaMax} <span className="text-base font-medium text-muted">días</span>
                </p>
                <p className="text-xs text-muted capitalize">Confianza {shipment.etaConfidence}</p>
              </div>
            )}
          </div>

          {ownerStep ? (
            <div className="mt-4 pt-4 border-t border-signal-100 flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-sm text-ink-900 flex-1">
                <span className="font-semibold">Para destrabarlo:</span> {ownerStep.label.toLowerCase()}.
                Es el único paso que depende de ti.
              </p>
              <button
                onClick={() => resolveRetention(shipment.id)}
                className="shrink-0 rounded-lg bg-signal-500 text-white px-5 py-2.5 text-sm font-semibold hover:bg-signal-600 transition-colors"
              >
                Resolver ahora
              </button>
            </div>
          ) : (
            !shipment.causeKnown && (
              <p className="mt-4 pt-4 border-t border-signal-100 text-sm text-muted">
                Por ahora no hay nada que debas hacer. Nosotros gestionamos la liberación y te avisamos.
              </p>
            )
          )}
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {totalSteps > 0 && (
            <section className="rounded-xl border border-line bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold text-ink-900">Qué hacer</h3>
                <span className="text-xs font-medium text-muted">{completedSteps}/{totalSteps} completados</span>
              </div>
              <div className="h-1.5 rounded-full bg-ink-50 mb-4 overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-300"
                  style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                />
              </div>
              <ul className="space-y-2.5">
                {shipment.nextSteps.map((step, i) => (
                  <li key={i}>
                    <button onClick={() => toggleStep(shipment.id, i)} className="w-full flex items-start gap-3 text-left group">
                      <span
                        className={`mt-0.5 shrink-0 h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                          step.done ? 'bg-teal-500 border-teal-500' : 'border-line group-hover:border-ink-400'
                        }`}
                      >
                        {step.done && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="h-3 w-3">
                            <path d="m5 12 5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className={`text-sm leading-snug ${step.done ? 'text-muted line-through' : 'text-ink-900'} ${step.ownerAction ? 'font-semibold' : ''}`}>
                        {step.label}
                        {step.ownerAction && !step.done && (
                          <span className="ml-2 inline-block text-[11px] font-semibold uppercase tracking-wide text-signal-600 align-middle">
                            Tu turno
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="rounded-xl border border-line bg-card p-5">
            <h3 className="font-display font-semibold text-ink-900 mb-4">Todo lo que ha pasado</h3>
            <Timeline events={shipment.timeline} />
          </section>
        </div>

        <div className="space-y-5">
          {!isRetenido && shipment.status === 'transito' && shipment.etaMin != null && (
            <section className="rounded-xl border border-line bg-card p-5">
              <h3 className="font-display font-semibold text-ink-900 mb-3">Tiempo estimado</h3>
              <p className="font-display text-3xl font-semibold text-ink-900">
                {shipment.etaMin}–{shipment.etaMax} <span className="text-lg font-medium text-muted">días</span>
              </p>
              <p className="text-xs text-muted mt-1 capitalize">Confianza {shipment.etaConfidence}</p>
            </section>
          )}

          {shipment.client && (
            <section className="rounded-xl border border-line bg-card p-5">
              <h3 className="font-display font-semibold text-ink-900 mb-1">Compartir con tu cliente</h3>
              <p className="text-sm text-muted mb-4">{shipment.client} verá exactamente lo mismo que tú, en tiempo real.</p>
              <button
                onClick={() => setShared((v) => !v)}
                aria-pressed={shared}
                className={`w-full flex items-center justify-between rounded-lg border px-3.5 py-2.5 transition-colors ${
                  shared ? 'border-teal-200 bg-teal-50' : 'border-line'
                }`}
              >
                <span className="text-sm font-medium text-ink-900">{shared ? 'Vista activa' : 'Vista desactivada'}</span>
                <span className={`relative h-5 w-9 rounded-full transition-colors ${shared ? 'bg-teal-500' : 'bg-ink-100'}`}>
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${shared ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </span>
              </button>
              {shared && (
                <button
                  onClick={copyLink}
                  className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg bg-ink-50 hover:bg-ink-100 transition-colors px-3.5 py-2.5 text-sm font-medium text-ink-800"
                >
                  {copied ? 'Enlace copiado ✓' : `Copiar enlace para ${shipment.client}`}
                </button>
              )}
            </section>
          )}

          <section className="rounded-xl border border-line bg-ink-800 p-5 text-white">
            <h3 className="font-display font-semibold mb-1">¿Algo no cuadra?</h3>
            <p className="text-sm text-ink-200 mb-4">Si la información no coincide con lo que te dijo {carrier.name}, cuéntanos.</p>
            <button
              onClick={() => openChat(true)}
              className="w-full rounded-lg bg-white text-ink-800 px-3.5 py-2.5 text-sm font-semibold hover:bg-ink-100 transition-colors"
            >
              Escribir a soporte
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
