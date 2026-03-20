/**
 * PlacesFilterBar
 * Compound filter control for the My Places table.
 * Separates pending filters from applied filters (Apply button model).
 */

import { Search } from 'lucide-react'
import type { PlaceFilters, PlaceStatus } from '@/types'
import { TOWER_OPTIONS, COMPLEX_OPTIONS } from '@/lib/mockData'

const STATUS_OPTIONS: { value: PlaceStatus | ''; label: string }[] = [
  { value: '',         label: 'All Statuses' },
  { value: 'approved', label: 'Approved'     },
  { value: 'pending',  label: 'Pending'      },
  { value: 'rejected', label: 'Rejected'     },
  { value: 'inactive', label: 'Inactive'     },
]

interface PlacesFilterBarProps {
  pending:      PlaceFilters
  onUpdate:     (key: keyof PlaceFilters, value: string) => void
  onApply:      () => void
  onReset:      () => void
}

export function PlacesFilterBar({
  pending,
  onUpdate,
  onApply,
  onReset,
}: PlacesFilterBarProps) {
  return (
    <div className="card p-4 space-y-3">
      {/* ── Search ── */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
        />
        <input
          type="search"
          placeholder="Search by flat, complex or email…"
          value={pending.search}
          onChange={e => onUpdate('search', e.target.value)}
          aria-label="Search places"
          className="input-base pl-8"
        />
      </div>

      {/* ── Filter Row ── */}
      <div className="flex flex-wrap items-end gap-2">
        {/* Tower */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-2xs font-body font-medium text-stone-400 mb-1 uppercase tracking-wider">
            Tower
          </label>
          <div className="relative">
            <select
              value={pending.tower}
              onChange={e => onUpdate('tower', e.target.value)}
              aria-label="Filter by tower"
              className="select-base"
            >
              <option value="">All Towers</option>
              {TOWER_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400">
              ▾
            </span>
          </div>
        </div>

        {/* Complex */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-2xs font-body font-medium text-stone-400 mb-1 uppercase tracking-wider">
            Complex
          </label>
          <div className="relative">
            <select
              value={pending.complex}
              onChange={e => onUpdate('complex', e.target.value)}
              aria-label="Filter by complex"
              className="select-base"
            >
              <option value="">All Complexes</option>
              {COMPLEX_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400">
              ▾
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-2xs font-body font-medium text-stone-400 mb-1 uppercase tracking-wider">
            Status
          </label>
          <div className="relative">
            <select
              value={pending.status}
              onChange={e => onUpdate('status', e.target.value)}
              aria-label="Filter by status"
              className="select-base"
            >
              {STATUS_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400">
              ▾
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 items-end pb-0">
          <button
            onClick={onApply}
            className="btn-primary btn btn-md"
          >
            Apply
          </button>
          <button
            onClick={onReset}
            className="btn-secondary btn btn-md"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
