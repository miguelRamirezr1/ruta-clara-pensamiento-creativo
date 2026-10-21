import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { shipments, carriers } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import Timeline from '../components/Timeline'
import { useChat } from '../context/ChatContext'

export default function ShipmentDetail() {
  const { id } = useParams()
  const shipment = shipments.find((s) => s.id === id)
  const { setOpen: openChat } = useChat()
  const [shared, setShared] = useState(shipment?.sharedWithClient ?? false)
  const [copied, setCopied] = useState(false)
  const [checked, setChecked] = useState(() =>
    Object.fromEntries((shipment?.nextSteps ?? []).map((s, i) => [i, s.done]))
  )

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

  const carrier = carriers[shipment.carrier]
  const completedSteps = Object.values(checked).filter(Boolean).length
  const totalSteps = shipment.nextSteps.length

  function toggleStep(i) {
    setChecked((c) => ({ ...c, [i]: !c[i] }))
  }

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

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {shipment.status === 'retenido' && (
            <section className="rounded-xl border border-line bg-card p-5">
              <h3 className="font-display font-semibold text-ink-900 mb-3">Causa de la retención</h3>
              {shipment.causeKnown ? (
                <div className="rounded-lg bg-signal-50 border border-signal-100 p-4">
                  <p className="text-sm text-ink-900 leading-relaxed">{shipment.causeSimple}</p>
                </div>
              ) : (
                <div className="rounded-lg bg-amber-50 border border-amber-100 p-4 flex items-start gap-3">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-500 shrink-0 animate-pulse" />
                  <p className="text-sm text-ink-900 leading-relaxed">
                    Todavía estamos confirmando la causa exacta con {carrier.name}. Te avisamos en cuanto la tengamos — no necesitas volver a preguntar.
                  </p>
                </div>
              )}
            </section>
          )}

          {shipment.status === 'retenido' && (
            <section className="rounded-xl border border-line bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold text-ink-900">Qué hacer</h3>
                {totalSteps > 0 && (
                  <span className="text-xs font-medium text-muted">
                    {completedSteps}/{totalSteps} completados
                  </span>
                )}
              </div>
              {totalSteps > 0 && (
                <div className="h-1.5 rounded-full bg-ink-50 mb-4 overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                  />
                </div>
              )}
              <ul className="space-y-2.5">
                {shipment.nextSteps.map((step, i) => (
                  <li key={i}>
                    <button
                      onClick={() => toggleStep(i)}
                      className="w-full flex items-start gap-3 text-left group"
                    >
                      <span
                        className={`mt-0.5 shrink-0 h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                          checked[i] ? 'bg-teal-500 border-teal-500' : 'border-line group-hover:border-ink-400'
                        }`}
                      >
                        {checked[i] && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="h-3 w-3">
                            <path d="m5 12 5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span
                        className={`text-sm leading-snug ${
                          checked[i] ? 'text-muted line-through' : 'text-ink-900'
                        } ${step.label.includes('a ti') ? 'font-semibold' : ''}`}
                      >
                        {step.label}
                        {step.label.includes('a ti') && !checked[i] && (
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
          {shipment.status === 'retenido' && (
            <section className="rounded-xl border border-line bg-card p-5">
              <h3 className="font-display font-semibold text-ink-900 mb-3">Tiempo estimado</h3>
              {shipment.etaMin != null ? (
                <>
                  <p className="font-display text-3xl font-semibold text-ink-900">
                    {shipment.etaMin}–{shipment.etaMax} <span className="text-lg font-medium text-muted">días</span>
                  </p>
                  <p className="text-xs text-muted mt-1 capitalize">Confianza {shipment.etaConfidence}</p>
                </>
              ) : (
                <p className="text-sm text-muted">Aún no tenemos un estimado confiable. Te avisamos apenas lo tengamos.</p>
              )}
            </section>
          )}

          {shipment.client && (
            <section className="rounded-xl border border-line bg-card p-5">
              <h3 className="font-display font-semibold text-ink-900 mb-1">Compartir con tu cliente</h3>
              <p className="text-sm text-muted mb-4">
                {shipment.client} verá exactamente lo mismo que tú, en tiempo real.
              </p>
              <button
                onClick={() => setShared((v) => !v)}
                className={`w-full flex items-center justify-between rounded-lg border px-3.5 py-2.5 transition-colors ${
                  shared ? 'border-teal-200 bg-teal-50' : 'border-line'
                }`}
              >
                <span className="text-sm font-medium text-ink-900">
                  {shared ? 'Vista activa' : 'Vista desactivada'}
                </span>
                <span
                  className={`relative h-5 w-9 rounded-full transition-colors ${shared ? 'bg-teal-500' : 'bg-ink-100'}`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                      shared ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </span>
              </button>
              {shared && (
                <button
                  onClick={copyLink}
                  className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg bg-ink-50 hover:bg-ink-100 transition-colors px-3.5 py-2.5 text-sm font-medium text-ink-800"
                >
                  {copied ? 'Enlace copiado ✓' : `rutaclara.co/s/${shipment.id.toLowerCase()}`}
                </button>
              )}
            </section>
          )}

          <section className="rounded-xl border border-line bg-ink-800 p-5 text-white">
            <h3 className="font-display font-semibold mb-1">¿Algo no cuadra?</h3>
            <p className="text-sm text-ink-200 mb-4">
              Si la información no coincide con lo que te dijo {carrier.name}, cuéntanos.
            </p>
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
