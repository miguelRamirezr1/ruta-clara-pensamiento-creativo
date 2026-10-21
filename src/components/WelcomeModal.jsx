import { useState } from 'react'

const SLIDES = [
  {
    title: 'Sabe qué pasa con tu envío, sin perseguir respuestas',
    body: 'Apenas haya una retención u otra novedad, te avisamos por WhatsApp o push. No tienes que entrar a revisar cada rato.',
  },
  {
    title: 'La causa, en palabras simples',
    body: 'Nada de "estado desconocido". Te decimos exactamente por qué está retenido tu envío y qué te corresponde hacer a ti.',
  },
  {
    title: 'Una persona real, cuando la necesites',
    body: 'El botón "Hablar con una persona real" te conecta con soporte de verdad — no un bot que repite lo mismo.',
  },
]

export default function WelcomeModal({ onClose }) {
  const [i, setI] = useState(0)
  const last = i === SLIDES.length - 1

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-ink-900/50 p-0 sm:p-4">
      <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-card p-6 sm:p-7">
        <div className="flex gap-1.5 mb-6">
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 flex-1 rounded-full transition-colors ${idx <= i ? 'bg-ink-800' : 'bg-ink-50'}`}
            />
          ))}
        </div>

        <h2 className="font-display text-xl font-semibold text-ink-900 leading-snug">{SLIDES[i].title}</h2>
        <p className="text-sm text-muted mt-2.5 leading-relaxed">{SLIDES[i].body}</p>

        <div className="mt-7 flex items-center justify-between">
          <button onClick={onClose} className="text-sm font-medium text-muted hover:text-ink-800">
            Omitir
          </button>
          <button
            onClick={() => (last ? onClose() : setI((v) => v + 1))}
            className="rounded-lg bg-ink-800 text-white px-5 py-2.5 text-sm font-semibold hover:bg-ink-700 transition-colors"
          >
            {last ? 'Entrar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  )
}
