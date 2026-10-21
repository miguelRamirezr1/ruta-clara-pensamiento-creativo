import { useEffect, useRef, useState } from 'react'
import { chatShortcuts } from '../data/mockData'

const CANNED_REPLIES = {
  '¿Qué significa "retenido"?':
    'Que tu envío está detenido antes de continuar su ruta — casi siempre por un tema aduanero o de documentación, no por pérdida ni daño. Apenas sepamos la causa exacta, te avisamos aquí y por WhatsApp.',
  '¿Qué debo hacer ahora?':
    'Por ahora no necesitas hacer nada más: ya identificamos la causa y te dejamos los pasos exactos en la pestaña "Qué hacer" de tu envío. Si alguno requiere que envíes un documento, te lo marco como pendiente de tu parte.',
  'Hablar con una persona real':
    '¡Ya me tienes! Soy Laura, del equipo de soporte de RutaClara. Cuéntame qué envío te preocupa y lo reviso contigo ahora mismo.',
}

export default function ChatDrawer({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      from: 'agent',
      text: 'Hola, soy Laura del equipo de RutaClara — una persona real, no un bot. ¿En qué te ayudo?',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function send(text) {
    if (!text.trim()) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    const reply =
      CANNED_REPLIES[text] ??
      'Gracias por contarme. Lo reviso con el equipo de la transportadora y te confirmo por aquí en un momento — no tienes que volver a preguntar, yo te aviso.'
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'agent', text: reply }])
    }, 900)
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-ink-900/40" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`fixed z-50 inset-y-0 right-0 w-full max-w-sm bg-card border-l border-line flex flex-col transition-transform duration-200 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Chat con soporte"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between gap-3 px-5 h-16 border-b border-line shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-full bg-teal-100 flex items-center justify-center font-display font-semibold text-teal-600 text-sm">
              L
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-teal-500 ring-2 ring-card" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900">Laura · Soporte</p>
              <p className="text-xs text-teal-600">En línea ahora</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-ink-500 hover:bg-ink-50"
            aria-label="Cerrar chat"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3 scrollbar-thin">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.from === 'user'
                    ? 'bg-ink-800 text-white rounded-br-sm'
                    : 'bg-ink-50 text-ink-900 rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-ink-50 rounded-xl rounded-bl-sm px-3.5 py-2.5 flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-ink-300 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink-300 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink-300 animate-bounce" />
              </div>
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-line shrink-0">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {chatShortcuts.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs font-medium rounded-full border border-line px-3 py-1.5 text-ink-700 hover:border-ink-400 hover:bg-ink-50 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje…"
              className="flex-1 rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink-300"
            />
            <button
              type="submit"
              className="rounded-lg bg-ink-800 text-white p-2.5 hover:bg-ink-700 transition-colors disabled:opacity-40"
              disabled={!input.trim()}
              aria-label="Enviar mensaje"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
