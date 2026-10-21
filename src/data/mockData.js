// Datos simulados (hardcoded) — inspirados en los hallazgos reales de la encuesta
// "Retenciones y Rastreo de Envíos"

export const user = {
  name: 'Camila Restrepo',
  role: 'seller', // 'seller' = vende y despacha | 'buyer' = compra y recibe
  roleLabel: 'Vendedora — Moda Andina Store',
  avatarInitials: 'CR',
  plan: 'free', // 'free' | 'pro'
}

export const plans = [
  {
    id: 'free',
    name: 'Gratis',
    price: '$0',
    period: 'siempre',
    tagline: 'Para quienes reciben pocos envíos al año',
    features: [
      'Rastreo de hasta 2 envíos activos',
      'Estado general por guía',
      'Consulta manual de causa',
    ],
    missing: ['Avisos automáticos', 'Persona real por WhatsApp', 'Vista para tu cliente'],
  },
  {
    id: 'personal',
    name: 'Personal',
    price: '$35.000',
    period: '/mes',
    tagline: 'Para compradores frecuentes',
    features: [
      'Envíos activos ilimitados',
      'Aviso inmediato por WhatsApp y push',
      'Causa explicada en lenguaje simple',
      'Tiempo estimado realista',
      'Pasos concretos para resolver',
    ],
    missing: ['Vista compartida para clientes', 'Línea prioritaria con persona real'],
    highlight: true,
  },
  {
    id: 'negocio',
    name: 'Negocio',
    price: 'Desde $90.000',
    period: '/mes · según volumen',
    tagline: 'Para quienes venden y despachan',
    features: [
      'Todo lo del plan Personal',
      'Vista compartida en tiempo real para tus clientes',
      'Línea prioritaria con persona real',
      'Panel consolidado multi-envío',
      'Reportes para negociar con transportadoras',
    ],
    missing: [],
  },
]

export const carriers = {
  servientrega: { name: 'Servientrega', color: '#F2B134' },
  coordinadora: { name: 'Coordinadora', color: '#1F9C8B' },
  interrapidisimo: { name: 'Inter Rapidísimo', color: '#E8722C' },
  dhl: { name: 'DHL', color: '#D6961A' },
  fedex: { name: 'FedEx', color: '#37507D' },
}

// Devuelve la transportadora de un envío, incluidas las "Otra" escritas a mano
// (que no están en el catálogo `carriers`).
export function resolveCarrier(shipment) {
  return (
    carriers[shipment.carrier] ?? {
      name: shipment.carrierName || 'Otra transportadora',
      color: '#667085',
    }
  )
}

// Estados: retenido | transito | entregado
export const shipments = [
  {
    id: 'SV-88213904',
    carrier: 'servientrega',
    status: 'retenido',
    origin: 'Bogotá, CO',
    destination: 'Medellín, CO',
    product: 'Lote de 40 chaquetas — pedido #4021',
    client: 'Tienda Nórdico',
    retainedSince: '2026-09-08',
    causeKnown: true,
    cause: 'La factura comercial no coincide con el valor declarado ante la DIAN.',
    causeSimple:
      'La DIAN encontró una diferencia entre lo que dice la factura y el valor que se declaró. Por eso no puede seguir el trámite hasta que se aclare.',
    etaMin: 3,
    etaMax: 5,
    etaConfidence: 'alta',
    nextSteps: [
      { done: true, label: 'La transportadora notificó la retención' },
      { done: true, label: 'Se identificó la causa exacta' },
      { done: false, label: 'Enviar la factura corregida a la DIAN', ownerAction: true },
      { done: false, label: 'La DIAN revisa el documento (1–2 días hábiles)' },
      { done: false, label: 'Envío liberado y despachado' },
    ],
    timeline: [
      { date: '2026-09-08 09:14', label: 'Envío retenido en bodega DIAN', tone: 'signal' },
      { date: '2026-09-08 14:02', label: 'Causa identificada: factura comercial', tone: 'signal' },
      { date: '2026-09-09 08:30', label: 'Aviso enviado por WhatsApp', tone: 'ink' },
      { date: '2026-09-09 09:00', label: 'Esperando corrección de factura', tone: 'amber' },
    ],
    sharedWithClient: true,
  },
  {
    id: 'CO-44192771',
    carrier: 'coordinadora',
    status: 'transito',
    origin: 'Cali, CO',
    destination: 'Bucaramanga, CO',
    product: 'Insumos de librería — pedido #3998',
    client: null,
    causeKnown: false,
    etaMin: 1,
    etaMax: 2,
    etaConfidence: 'alta',
    nextSteps: [],
    timeline: [
      { date: '2026-09-09 07:00', label: 'Salió de bodega Cali', tone: 'teal' },
      { date: '2026-09-10 13:20', label: 'En tránsito hacia Bucaramanga', tone: 'teal' },
    ],
    sharedWithClient: false,
  },
  {
    id: 'IR-10938211',
    carrier: 'interrapidisimo',
    status: 'retenido',
    origin: 'Miami, US',
    destination: 'Barranquilla, CO',
    product: 'Repuestos electrónicos — pedido #4055',
    client: 'Taller Motion',
    retainedSince: '2026-09-10',
    causeKnown: false,
    cause: null,
    causeSimple: null,
    etaMin: null,
    etaMax: null,
    etaConfidence: 'baja',
    nextSteps: [
      { done: true, label: 'La transportadora notificó la retención' },
      { done: false, label: 'Identificando la causa exacta (en curso)' },
    ],
    timeline: [
      { date: '2026-09-10 16:45', label: 'Envío retenido en aduana', tone: 'signal' },
      { date: '2026-09-10 17:00', label: 'Estamos consultando la causa con la transportadora', tone: 'amber' },
    ],
    sharedWithClient: true,
  },
  {
    id: 'DHL-77201',
    carrier: 'dhl',
    status: 'entregado',
    origin: 'Ciudad de México, MX',
    destination: 'Medellín, CO',
    product: 'Muestras textiles — pedido #3960',
    client: null,
    causeKnown: false,
    etaMin: 0,
    etaMax: 0,
    etaConfidence: 'alta',
    nextSteps: [],
    timeline: [
      { date: '2026-09-05 10:00', label: 'Salió de origen', tone: 'teal' },
      { date: '2026-09-07 09:12', label: 'Entregado en destino', tone: 'teal' },
    ],
    sharedWithClient: false,
  },
]

export const notifications = [
  {
    id: 1,
    unread: true,
    type: 'signal',
    shipmentId: 'SV-88213904',
    title: 'Nueva causa identificada',
    body: 'SV-88213904: la retención es por diferencia en la factura comercial.',
    time: 'hace 2 h',
  },
  {
    id: 2,
    unread: true,
    type: 'amber',
    shipmentId: 'SV-88213904',
    title: 'Acción pendiente de tu parte',
    body: 'SV-88213904: debes enviar la factura corregida para continuar el trámite.',
    time: 'hace 2 h',
  },
  {
    id: 3,
    unread: true,
    type: 'signal',
    shipmentId: 'IR-10938211',
    title: 'Envío retenido en aduana',
    body: 'IR-10938211 quedó retenido en Barranquilla. Estamos averiguando la causa.',
    time: 'hace 19 h',
  },
  {
    id: 4,
    unread: false,
    type: 'teal',
    shipmentId: 'DHL-77201',
    title: 'Envío entregado',
    body: 'DHL-77201 llegó a su destino en Medellín.',
    time: 'hace 4 días',
  },
]

export const chatShortcuts = [
  '¿Qué significa "retenido"?',
  '¿Qué debo hacer ahora?',
  'Hablar con una persona real',
]
