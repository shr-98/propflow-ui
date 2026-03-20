/**
 * PlacesTable
 * Accessible, sortable data table mirroring the My Places view.
 *
 * Accessibility:
 *   • role="table" with aria-label
 *   • column headers have scope="col"
 *   • Empty state with aria-live region
 *   • Row actions accessible via keyboard
 */

import { Users, Car, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react'
import type { Place } from '@/types'
import { formatDateTime, getStatusBadgeClass, capitalise } from '@/lib/utils'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PlacesTableProps {
  places: Place[]
}

export function PlacesTable({ places }: PlacesTableProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  if (places.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="card flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-3">
          <span className="text-2xl">📍</span>
        </div>
        <p className="font-display font-semibold text-stone-700 text-base">No places found</p>
        <p className="font-body text-stone-400 text-sm mt-1">
          Try adjusting your filters or add a new place.
        </p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table
          role="table"
          aria-label="My Places list"
          className="w-full"
        >
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/70">
              <th scope="col" className="table-header-cell">Flat / Unit</th>
              <th scope="col" className="table-header-cell">Complex</th>
              <th scope="col" className="table-header-cell">Tower</th>
              <th scope="col" className="table-header-cell">Staff / Vehicle</th>
              <th scope="col" className="table-header-cell">Created On</th>
              <th scope="col" className="table-header-cell">Status</th>
              <th scope="col" className="table-header-cell sr-only">Actions</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place, idx) => (
              <tr
                key={place.id}
                className={cn(
                  'table-row',
                  idx % 2 === 1 && 'bg-stone-50/40',
                )}
              >
                {/* Flat */}
                <td className="table-cell">
                  <span className="font-medium text-stone-800">{place.flat}</span>
                </td>

                {/* Complex */}
                <td className="table-cell text-stone-600">{place.complex}</td>

                {/* Tower */}
                <td className="table-cell">
                  {place.tower
                    ? <span className="font-mono text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                        {place.tower}
                      </span>
                    : <span className="text-stone-300">—</span>
                  }
                </td>

                {/* Staff / Vehicle */}
                <td className="table-cell">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-stone-500">
                      <Users size={13} className="text-sage-500" />
                      <span className="font-mono text-xs font-medium">{place.staffCount}</span>
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <Car size={13} className="text-stone-400" />
                      <span className="font-mono text-xs font-medium">{place.vehicleCount}</span>
                    </span>
                  </div>
                </td>

                {/* Created On */}
                <td className="table-cell">
                  <span className="text-xs font-mono text-stone-500">
                    {formatDateTime(place.createdOn)}
                  </span>
                </td>

                {/* Status */}
                <td className="table-cell">
                  <span className={getStatusBadgeClass(place.status)}>
                    <span className={cn(
                      'w-1.5 h-1.5 rounded-full flex-shrink-0',
                      place.status === 'approved' ? 'bg-green-500' :
                      place.status === 'pending'  ? 'bg-amber-500' :
                      place.status === 'rejected' ? 'bg-red-500'   : 'bg-stone-400',
                    )} />
                    {capitalise(place.status)}
                  </span>
                </td>

                {/* Actions */}
                <td className="table-cell">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === place.id ? null : place.id)}
                      aria-label={`Actions for ${place.flat}`}
                      className="btn-ghost btn btn-sm rounded-md"
                    >
                      <MoreHorizontal size={15} />
                    </button>

                    {/* Dropdown */}
                    {openMenu === place.id && (
                      <div
                        className="absolute right-0 top-full mt-1 z-20
                                   bg-white border border-stone-200 rounded-xl
                                   shadow-popover min-w-[148px] py-1
                                   animate-fade-up"
                        role="menu"
                        aria-label="Place actions"
                      >
                        {[
                          { icon: Eye,    label: 'View details', danger: false },
                          { icon: Pencil, label: 'Edit',         danger: false },
                          { icon: Trash2, label: 'Remove',       danger: true  },
                        ].map(({ icon: Icon, label, danger }) => (
                          <button
                            key={label}
                            role="menuitem"
                            onClick={() => setOpenMenu(null)}
                            className={cn(
                              'flex items-center gap-2.5 w-full px-3 py-2 text-sm font-body',
                              'transition-colors duration-100',
                              danger
                                ? 'text-red-500 hover:bg-red-50'
                                : 'text-stone-600 hover:bg-stone-50',
                            )}
                          >
                            <Icon size={14} />
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer row count */}
      <div className="px-4 py-2.5 border-t border-stone-100 flex items-center justify-between">
        <p className="text-xs font-body text-stone-400">
          Showing <span className="font-medium text-stone-600">{places.length}</span> place{places.length !== 1 ? 's' : ''}
        </p>
        {/* Pagination placeholder */}
        <div className="flex items-center gap-1">
          {['‹', '1', '2', '›'].map(p => (
            <button
              key={p}
              className={cn(
                'w-7 h-7 rounded-lg text-xs font-body font-medium transition-colors',
                p === '1'
                  ? 'bg-sage-500 text-white'
                  : 'text-stone-500 hover:bg-stone-100',
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
