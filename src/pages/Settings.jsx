import { useState } from 'react'
import { user } from '../data/mockData'

const CHANNELS = [
  { id: 'whatsapp', label: 'WhatsApp', desc: 'Aviso apenas cambie el estado' },
  { id: 'push', label: 'Notificaciones push', desc: 'En este navegador o app' },
  { id: 'email', label: 'Correo', desc: 'Resumen diario si hay novedades' },
]

export default function Settings() {
  const [enabled, setEnabled] = useState({ whatsapp: true, push: true, email: false })
  const [saved, setSaved] = useState(false)

  function toggle(id) {
    setEnabled((e) => ({ ...e, [id]: !e[id] }))
  }
  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div className="max-w-xl space-y-5">
      <section className="rounded-xl border border-line bg-card p-5">
        <h3 className="font-display font-semibold text-ink-900 mb-4">Tu cuenta</h3>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-signal-500 flex items-center justify-center text-sm font-semibold text-white">
            {user.avatarInitials}
          </div>
          <div>
            <p className="text-sm font-medium text-ink-900">{user.name}</p>
            <p className="text-sm text-muted">{user.roleLabel}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-card p-5">
        <h3 className="font-display font-semibold text-ink-900 mb-1">Cómo quieres que te avisemos</h3>
        <p className="text-sm text-muted mb-4">Apenas haya novedad en un envío, sin que tengas que preguntar.</p>
        <div className="space-y-3">
          {CHANNELS.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-ink-900">{c.label}</p>
                <p className="text-xs text-muted">{c.desc}</p>
              </div>
              <button
                onClick={() => toggle(c.id)}
                className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${
                  enabled[c.id] ? 'bg-teal-500' : 'bg-ink-100'
                }`}
                aria-pressed={enabled[c.id]}
                aria-label={`Notificaciones por ${c.label}`}
              >
                <span
                  className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                  style={{ transform: enabled[c.id] ? 'translateX(18px)' : 'translateX(2px)' }}
                />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={save}
          className="mt-5 w-full sm:w-auto rounded-lg bg-ink-800 text-white px-5 py-2.5 text-sm font-semibold hover:bg-ink-700 transition-colors"
        >
          {saved ? 'Guardado ✓' : 'Guardar cambios'}
        </button>
      </section>
    </div>
  )
}
