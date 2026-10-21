import ChatDrawer from './ChatDrawer'
import { useChat } from '../context/ChatContext'

export default function FabChat() {
  const { open, setOpen } = useChat()

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-ink-800 text-white pl-4 pr-5 py-3.5 shadow-pop hover:bg-ink-700 transition-colors"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500" />
        </span>
        <span className="text-sm font-semibold hidden sm:inline">Hablar con una persona</span>
        <span className="text-sm font-semibold sm:hidden">Soporte</span>
      </button>
      <ChatDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
