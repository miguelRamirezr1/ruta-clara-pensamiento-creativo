import { useState } from 'react'
import { plans, user } from '../data/mockData'

export default function Plans() {
  const [current, setCurrent] = useState(user.plan === 'free' ? 'free' : 'personal')
  const [justChanged, setJustChanged] = useState(false)

  function choose(id) {
    setCurrent(id)
    setJustChanged(true)
    setTimeout(() => setJustChanged(false), 2200)
  }

  return (
    <div>
      <p className="text-sm text-muted max-w-xl mb-6">
        Empieza gratis. Sube de plan cuando quieras tener aviso inmediato, causa explicada y una persona real disponible.
      </p>

      {justChanged && (
        <div className="mb-5 rounded-lg bg-teal-50 border border-teal-100 px-4 py-3 text-sm text-teal-700 font-medium">
          Listo — tu plan quedó configurado. Los cambios aplican de inmediato.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => {
          const isCurrent = current === plan.id
          return (
            <div
              key={plan.id}
              className={`relative rounded-xl border bg-card p-6 flex flex-col ${
                plan.highlight ? 'border-ink-800 shadow-pop' : 'border-line'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-ink-800 text-white text-[11px] font-semibold px-3 py-1">
                  Más elegido
                </span>
              )}
              <h3 className="font-display font-semibold text-lg text-ink-900">{plan.name}</h3>
              <p className="text-sm text-muted mt-1">{plan.tagline}</p>
              <p className="mt-4">
                <span className="font-display text-3xl font-semibold text-ink-900">{plan.price}</span>
                <span className="text-sm text-muted"> {plan.period}</span>
              </p>

              <ul className="mt-5 space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-800">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1F9C8B" strokeWidth="2.5" className="h-4 w-4 mt-0.5 shrink-0">
                      <path d="m5 12 5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 mt-0.5 shrink-0">
                      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => choose(plan.id)}
                className={`mt-6 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isCurrent
                    ? 'bg-ink-50 text-ink-500 cursor-default'
                    : plan.highlight
                    ? 'bg-ink-800 text-white hover:bg-ink-700'
                    : 'border border-ink-800 text-ink-800 hover:bg-ink-50'
                }`}
                disabled={isCurrent}
              >
                {isCurrent ? 'Plan actual' : plan.id === 'free' ? 'Cambiar a gratis' : 'Elegir plan'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
