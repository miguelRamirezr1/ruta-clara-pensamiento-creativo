const STATUS_MAP = {
  retenido: { label: 'Retenido', dot: 'bg-signal-500', text: 'text-signal-600', bg: 'bg-signal-50' },
  transito: { label: 'En tránsito', dot: 'bg-teal-500', text: 'text-teal-600', bg: 'bg-teal-50' },
  entregado: { label: 'Entregado', dot: 'bg-ink-400', text: 'text-ink-500', bg: 'bg-ink-50' },
}

export default function StatusBadge({ status, size = 'md' }) {
  const cfg = STATUS_MAP[status] ?? STATUS_MAP.transito
  const pad = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${pad} ${cfg.bg} ${cfg.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

export { STATUS_MAP }
