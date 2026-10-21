import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { carriers } from '../data/mockData'
import { useShipments } from '../context/ShipmentsContext'

const STEPS = ['Transportadora', 'Datos del pedido', 'Confirmar']

export default function AddShipment() {
  const navigate = useNavigate()
  const { addShipment } = useShipments()
  const [step, setStep] = useState(0)
  const [carrier, setCarrier] = useState(null)
  const [otherName, setOtherName] = useState('')
  const [guide, setGuide] = useState('')
  const [product, setProduct] = useState('')
  const [destination, setDestination] = useState('')
  const [connecting, setConnecting] = useState(false)
  const [created, setCreated] = useState(null)

  const isOther = carrier === 'otra'
  const carrierLabel = isOther ? otherName.trim() || 'Otra transportadora' : carriers[carrier]?.name

  function next() {
    if (step === STEPS.length - 1) return
    setStep((s) => s + 1)
  }
  function back() {
    setStep((s) => Math.max(0, s - 1))
  }

  function confirm() {
    setConnecting(true)
    setTimeout(() => {
      const shipment = addShipment({
        carrier,
        carrierName: otherName,
        guide,
        product,
        destination,
      })
      setConnecting(false)
      setCreated(shipment)
    }, 1200)
  }

  function reset() {
    setStep(0)
    setCarrier(null)
    setOtherName('')
    setGuide('')
    setProduct('')
    setDestination('')
    setCreated(null)
  }

  const canAdvance =
    (step === 0 && carrier && (!isOther || otherName.trim().length >= 2)) ||
    (step === 1 && guide.trim().length >= 4 && product.trim().length >= 2) ||
    step === 2

  if (created) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="mx-auto h-14 w-14 rounded-full bg-teal-100 flex items-center justify-center mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1F9C8B" strokeWidth="2.5" className="h-7 w-7">
            <path d="m5 12 5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-display text-xl font-semibold text-ink-900">Pedido conectado</h2>
        <p className="text-sm text-muted mt-2">
          Vamos a avisarte apenas haya novedades con la guía{' '}
          <span className="font-mono">{created.id}</span>. No necesitas volver a consultar por tu cuenta.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5 justify-center">
          <button
            onClick={() => navigate(`/envio/${created.id}`)}
            className="rounded-lg bg-ink-800 text-white px-5 py-2.5 text-sm font-semibold hover:bg-ink-700 transition-colors"
          >
            Ver este pedido
          </button>
          <button
            onClick={reset}
            className="rounded-lg border border-ink-800 text-ink-800 px-5 py-2.5 text-sm font-semibold hover:bg-ink-50 transition-colors"
          >
            Agregar otro pedido
          </button>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-sm font-medium text-muted hover:text-ink-800"
        >
          Ir a mis envíos
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <ol className="flex items-center gap-2 mb-8">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-xs font-semibold ${
                  i < step
                    ? 'bg-teal-500 text-white'
                    : i === step
                    ? 'bg-ink-800 text-white'
                    : 'bg-ink-50 text-muted'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </span>
              <span className={`text-sm font-medium hidden sm:inline ${i === step ? 'text-ink-900' : 'text-muted'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && <span className="flex-1 h-px bg-line" />}
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-line bg-card p-6">
        {step === 0 && (
          <>
            <h2 className="font-display font-semibold text-ink-900 mb-1">¿Con qué transportadora va tu pedido?</h2>
            <p className="text-sm text-muted mb-5">Conectamos directo con ella para traer el estado real.</p>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(carriers).map(([key, c]) => (
                <button
                  key={key}
                  onClick={() => setCarrier(key)}
                  className={`rounded-lg border px-3.5 py-3 text-left transition-colors ${
                    carrier === key ? 'border-ink-800 ring-1 ring-ink-800' : 'border-line hover:border-ink-300'
                  }`}
                >
                  <span className="inline-block h-2.5 w-2.5 rounded-full mb-2" style={{ backgroundColor: c.color }} />
                  <p className="text-sm font-medium text-ink-900">{c.name}</p>
                </button>
              ))}
              <button
                onClick={() => setCarrier('otra')}
                className={`rounded-lg border px-3.5 py-3 text-left transition-colors ${
                  isOther ? 'border-ink-800 ring-1 ring-ink-800' : 'border-line border-dashed hover:border-ink-300'
                }`}
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full mb-2 bg-muted" />
                <p className="text-sm font-medium text-ink-900">Otra transportadora</p>
              </button>
            </div>
            {isOther && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-ink-900 mb-1.5">¿Cuál?</label>
                <input
                  value={otherName}
                  onChange={(e) => setOtherName(e.target.value)}
                  placeholder="Ej. Envía, TCC, 4-72, Deprisa…"
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink-300"
                />
                <p className="text-xs text-muted mt-1.5">
                  Si tu transportadora no está en la lista, escríbela aquí. Igual rastreamos tu pedido.
                </p>
              </div>
            )}
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="font-display font-semibold text-ink-900 mb-1">Datos del pedido</h2>
            <p className="text-sm text-muted mb-5">Con esto podemos avisarte y mostrarte el estado.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink-900 mb-1.5">¿Qué estás pidiendo o enviando?</label>
                <input
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Ej. Lote de 20 camisetas — pedido #1203"
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-900 mb-1.5">Número de guía</label>
                <input
                  value={guide}
                  onChange={(e) => setGuide(e.target.value)}
                  placeholder="Ej. SV-88213904"
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 font-mono text-sm text-ink-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink-300"
                />
                <p className="text-xs text-muted mt-1.5">Lo encuentras en tu comprobante o en el mensaje de confirmación.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-900 mb-1.5">
                  Destino <span className="font-normal text-muted">(opcional)</span>
                </label>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Ej. Medellín, CO"
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink-300"
                />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-display font-semibold text-ink-900 mb-1">Confirma los datos</h2>
            <p className="text-sm text-muted mb-5">Así vamos a rastrear tu pedido.</p>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-muted">Transportadora</dt>
                <dd className="font-medium text-ink-900">{carrierLabel}</dd>
              </div>
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-muted">Pedido</dt>
                <dd className="font-medium text-ink-900 text-right max-w-[60%]">{product}</dd>
              </div>
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-muted">Número de guía</dt>
                <dd className="font-mono font-medium text-ink-900">{guide}</dd>
              </div>
              {destination.trim() && (
                <div className="flex justify-between">
                  <dt className="text-muted">Destino</dt>
                  <dd className="font-medium text-ink-900">{destination}</dd>
                </div>
              )}
            </dl>
          </>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="text-sm font-medium text-muted hover:text-ink-800 disabled:opacity-0"
          >
            Atrás
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              disabled={!canAdvance}
              className="rounded-lg bg-ink-800 text-white px-5 py-2.5 text-sm font-semibold hover:bg-ink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Continuar
            </button>
          ) : (
            <button
              onClick={confirm}
              disabled={connecting}
              className="rounded-lg bg-ink-800 text-white px-5 py-2.5 text-sm font-semibold hover:bg-ink-700 disabled:opacity-60 transition-colors inline-flex items-center gap-2"
            >
              {connecting && (
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 animate-spin">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              {connecting ? 'Conectando…' : 'Empezar a rastrear'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
