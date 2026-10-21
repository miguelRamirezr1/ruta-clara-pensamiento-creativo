const TONE_DOT = {
  signal: 'bg-signal-500',
  amber: 'bg-amber-500',
  teal: 'bg-teal-500',
  ink: 'bg-ink-400',
}

export default function Timeline({ events }) {
  return (
    <ol className="relative">
      {events.map((event, i) => (
        <li key={i} className="relative pl-7 pb-6 last:pb-0">
          {i !== events.length - 1 && (
            <span className="absolute left-[5px] top-3 bottom-0 w-px bg-line" aria-hidden="true" />
          )}
          <span
            className={`absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-card ${
              TONE_DOT[event.tone] ?? TONE_DOT.ink
            }`}
            aria-hidden="true"
          />
          <p className="text-sm text-ink-900 font-medium leading-snug">{event.label}</p>
          <p className="font-mono text-xs text-muted mt-0.5">{event.date}</p>
        </li>
      ))}
    </ol>
  )
}
