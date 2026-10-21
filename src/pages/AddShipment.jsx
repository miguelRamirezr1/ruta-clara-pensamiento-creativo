import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { carriers } from '../data/mockData'

const STEPS = ['Transportadora', 'Número de guía', 'Confirmar']

export default function AddShipment() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [carrier, setCarrier] = useState(null)
  const [guide, setGuide] = useState('')
  const [connecting, setConnecting] = useState(false)
  const [done, setDone] = useState(false)

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
      setConnecting(false)
      setDone(true)
    }, 1400)
  }

  const canAdvance = (step === 0 && carrier) || (step === 1 && guide.trim().length >= 4) || step === 2

  if (done) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="mx-auto h-14 w-14 rounded-full bg-teal-100 flex items-center justify-center mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1F9C8B" strokeWidth="2.5" className="h-7 w-7">
            <path d="m5 12 5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="font-display text-xl font-semibold text-ink-900">Envío conectado</h2>
        <p className="text-sm text-muted mt-2">
          Vamos a avisarte apenas haya novedades con la guía <span className="font-mono">{guide}</span>. No necesitas volver a consultar por tu cuenta.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 rounded-lg bg-ink-800 text-white px-5 py-2.5 text-sm font-semibold hover:bg-ink-700 transition-colors"
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
            <h2 className="font-display font-semibold text-ink-900 mb-1">¿Con qué transportadora va tu envío?</h2>
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
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full mb-2"
                    style={{ backgroundColor: c.color }}
                  />
                  <p className="text-sm font-medium text-ink-900">{c.name}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="font-display font-semibold text-ink-900 mb-1">Número de guía</h2>
            <p className="text-sm text-muted mb-5">Lo encuentras en tu comprobante de envío o en el mensaje de confirmación.</p>
            <input
              value={guide}
              onChange={(e) => setGuide(e.target.value)}
              placeholder="Ej. SV-88213904"
              className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 font-mono text-sm text-ink-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink-300"
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-display font-semibold text-ink-900 mb-1">Confirma los datos</h2>
            <p className="text-sm text-muted mb-5">Así vamos a rastrear tu envío.</p>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="text-muted">Transportadora</dt>
                <dd className="font-medium text-ink-900">{carriers[carrier]?.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Número de guía</dt>
                <dd className="font-mono font-medium text-ink-900">{guide}</dd>
              </div>
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
