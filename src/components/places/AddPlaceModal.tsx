/**
 * AddPlaceModal
 * ─────────────────────────────────────────────────────────────────────────────
 * Accessible modal dialog for creating a new Place.
 *
 * Accessibility:
 *   • role="dialog" + aria-modal + aria-labelledby
 *   • Focus trap: first input auto-focused on open
 *   • Escape key closes modal
 *   • Backdrop click closes modal
 *   • Error messages linked to inputs via aria-describedby
 */

import { useEffect, useRef, useState } from 'react'
import { X, MapPin, CheckCircle2 } from 'lucide-react'
import { TOWER_OPTIONS, COMPLEX_OPTIONS } from '@/lib/mockData'
import { cn } from '@/lib/utils'
import type { Place } from '@/types'

interface FormErrors {
  flat?:    string
  complex?: string
}

interface AddPlaceModalProps {
  isOpen:  boolean
  onClose: () => void
  onSave:  (flat: string, complex: string, tower: string) => Place
}

export function AddPlaceModal({ isOpen, onClose, onSave }: AddPlaceModalProps) {
  const [flat,     setFlat]     = useState('')
  const [complex,  setComplex]  = useState('')
  const [tower,    setTower]    = useState('')
  const [errors,   setErrors]   = useState<FormErrors>({})
  const [saved,    setSaved]    = useState(false)

  const firstInputRef = useRef<HTMLInputElement>(null)
  const dialogRef     = useRef<HTMLDivElement>(null)

  // Auto-focus first field
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 60)
      setSaved(false)
      setErrors({})
    }
  }, [isOpen])

  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  function validate(): boolean {
    const errs: FormErrors = {}
    if (!flat.trim())    errs.flat    = 'Flat / unit name is required'
    if (!complex.trim()) errs.complex = 'Please select a complex'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    onSave(flat.trim(), complex, tower)
    setSaved(true)
    setTimeout(() => {
      onClose()
      setFlat(''); setComplex(''); setTower(''); setSaved(false)
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   z-50 w-full max-w-md mx-auto animate-fade-up"
      >
        <div className="card rounded-2xl shadow-popover overflow-hidden">

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sage-50 flex items-center justify-center">
                <MapPin size={16} className="text-sage-600" />
              </div>
              <div>
                <h2
                  id="modal-title"
                  className="font-display font-semibold text-stone-800 text-base leading-none"
                >
                  Add New Place
                </h2>
                <p className="text-xs font-body text-stone-400 mt-0.5">
                  Register a flat, office or common area
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="btn-ghost btn btn-sm"
            >
              <X size={16} />
            </button>
          </div>

          {/* ── Body ── */}
          <div className="px-5 py-5 space-y-4">

            {/* Flat / Unit */}
            <div>
              <label
                htmlFor="place-flat"
                className="block text-xs font-body font-semibold text-stone-600 mb-1.5"
              >
                Flat / Unit Name <span className="text-red-400">*</span>
              </label>
              <input
                ref={firstInputRef}
                id="place-flat"
                type="text"
                value={flat}
                onChange={e => { setFlat(e.target.value); setErrors(v => ({ ...v, flat: undefined })) }}
                placeholder="e.g. A-101, FM Office, Lobby"
                aria-describedby={errors.flat ? 'flat-error' : undefined}
                aria-invalid={!!errors.flat}
                className={cn(
                  'input-base',
                  errors.flat && 'border-red-400 focus:ring-red-400/30 focus:border-red-400',
                )}
              />
              {errors.flat && (
                <p id="flat-error" role="alert" className="mt-1 text-xs text-red-500 font-body">
                  {errors.flat}
                </p>
              )}
            </div>

            {/* Complex */}
            <div>
              <label
                htmlFor="place-complex"
                className="block text-xs font-body font-semibold text-stone-600 mb-1.5"
              >
                Complex <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="place-complex"
                  value={complex}
                  onChange={e => { setComplex(e.target.value); setErrors(v => ({ ...v, complex: undefined })) }}
                  aria-describedby={errors.complex ? 'complex-error' : undefined}
                  aria-invalid={!!errors.complex}
                  className={cn(
                    'select-base',
                    errors.complex && 'border-red-400 focus:ring-red-400/30 focus:border-red-400',
                  )}
                >
                  <option value="">Select complex…</option>
                  {COMPLEX_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400">▾</span>
              </div>
              {errors.complex && (
                <p id="complex-error" role="alert" className="mt-1 text-xs text-red-500 font-body">
                  {errors.complex}
                </p>
              )}
            </div>

            {/* Tower (optional) */}
            <div>
              <label
                htmlFor="place-tower"
                className="block text-xs font-body font-semibold text-stone-600 mb-1.5"
              >
                Tower <span className="text-stone-300 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <select
                  id="place-tower"
                  value={tower}
                  onChange={e => setTower(e.target.value)}
                  className="select-base"
                >
                  <option value="">No specific tower</option>
                  {TOWER_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400">▾</span>
              </div>
            </div>

            {/* Info note */}
            <p className="text-xs font-body text-stone-400 bg-stone-50 rounded-lg px-3 py-2 leading-relaxed">
              New places are created with <span className="font-medium text-amber-600">Pending</span> status
              and require approval before staff can be assigned.
            </p>
          </div>

          {/* ── Footer ── */}
          <div className="px-5 py-4 border-t border-stone-100 flex items-center justify-between gap-3 bg-stone-50/50">
            <button onClick={onClose} className="btn-secondary btn btn-md flex-1">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saved}
              className={cn(
                'btn btn-md flex-1 gap-2',
                saved
                  ? 'bg-green-500 text-white cursor-default'
                  : 'btn-primary',
              )}
            >
              {saved ? (
                <>
                  <CheckCircle2 size={15} />
                  Saved!
                </>
              ) : (
                'Add Place'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
