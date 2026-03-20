/**
 * Toast System
 * ─────────────────────────────────────────────────────────────────────────────
 * Lightweight, accessible toast notifications.
 * • role="status" aria-live="polite" for non-urgent toasts
 * • role="alert"  aria-live="assertive" for errors
 * • Auto-dismiss after 4s; manual close available
 * • Stacks up to 5 toasts; oldest auto-removed
 */

import {
  createContext, useContext, useCallback, useState, useEffect,
  type ReactNode,
} from 'react'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn, generateId } from '@/lib/utils'
import type { ToastMessage } from '@/types'

// ─── Context ──────────────────────────────────────────────────────────────────
interface ToastContextValue {
  toast: (msg: Omit<ToastMessage, 'id'>) => void
  success: (title: string, description?: string) => void
  error:   (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
  info:    (title: string, description?: string) => void
}

const ToastCtx = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const remove = useCallback((id: string) =>
    setToasts(t => t.filter(x => x.id !== id)), [])

  const toast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const newToast = { ...msg, id: generateId() }
    setToasts(prev => [...prev.slice(-4), newToast])   // max 5
  }, [])

  const success = useCallback((title: string, description?: string) =>
    toast({ type: 'success', title, description }), [toast])
  const error   = useCallback((title: string, description?: string) =>
    toast({ type: 'error',   title, description }), [toast])
  const warning = useCallback((title: string, description?: string) =>
    toast({ type: 'warning', title, description }), [toast])
  const info    = useCallback((title: string, description?: string) =>
    toast({ type: 'info',    title, description }), [toast])

  return (
    <ToastCtx.Provider value={{ toast, success, error, warning, info }}>
      {children}
      <ToastRegion toasts={toasts} onRemove={remove} />
    </ToastCtx.Provider>
  )
}

// ─── Region (renders toasts) ──────────────────────────────────────────────────
const ICONS = {
  success: CheckCircle2,
  error:   AlertCircle,
  warning: AlertTriangle,
  info:    Info,
}
const COLORS = {
  success: 'border-l-green-500  bg-green-50  text-green-800',
  error:   'border-l-red-500    bg-red-50    text-red-800',
  warning: 'border-l-amber-500  bg-amber-50  text-amber-800',
  info:    'border-l-sage-500   bg-sage-50   text-sage-800',
}
const ICON_COLORS = {
  success: 'text-green-500',
  error:   'text-red-500',
  warning: 'text-amber-500',
  info:    'text-sage-500',
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: () => void }) {
  const Icon = ICONS[toast.type]

  // Auto-dismiss
  useEffect(() => {
    const t = setTimeout(onRemove, 4000)
    return () => clearTimeout(t)
  }, [onRemove])

  return (
    <div
      role={toast.type === 'error' ? 'alert' : 'status'}
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-xl border border-l-4',
        'shadow-popover min-w-[280px] max-w-sm animate-fade-up',
        COLORS[toast.type],
      )}
    >
      <Icon size={16} className={cn('mt-0.5 flex-shrink-0', ICON_COLORS[toast.type])} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-body font-semibold leading-snug">{toast.title}</p>
        {toast.description && (
          <p className="text-xs font-body mt-0.5 opacity-80 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={onRemove}
        aria-label="Dismiss notification"
        className="btn-ghost btn p-0.5 -mr-1 opacity-60 hover:opacity-100"
      >
        <X size={13} />
      </button>
    </div>
  )
}

function ToastRegion({
  toasts,
  onRemove,
}: {
  toasts:   ToastMessage[]
  onRemove: (id: string) => void
}) {
  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onRemove={() => onRemove(t.id)} />
        </div>
      ))}
    </div>
  )
}
