/**
 * PlacesPage
 * ─────────────────────────────────────────────────────────────────────────────
 * The "My Places" section — mirrors the screenshot layout.
 * Composed from: PlacesFilterBar + PlacesTable + AddPlaceModal.
 */

import { Plus, MapPin } from 'lucide-react'
import { useState } from 'react'
import { PlacesFilterBar } from '@/components/places/PlacesFilterBar'
import { PlacesTable }     from '@/components/places/PlacesTable'
import { AddPlaceModal }   from '@/components/places/AddPlaceModal'
import { useToast }        from '@/components/ui/Toast'
import { usePlaces, useDisclosure, useAddPlace } from '@/hooks'
import { cn } from '@/lib/utils'

export function PlacesPage() {
  const toast                                        = useToast()
  const { isOpen, open: openModal, close: closeModal } = useDisclosure()
  const { places, addPlace }                         = useAddPlace()
  const {
    pendingFilters,
    updatePending,
    applyFilters,
    resetFilters,
    filteredPlaces,
  } = usePlaces()

  // Override filteredPlaces to use live `places` state (includes newly added)
  const [localPlaces, setLocalPlaces] = useState(places)

  function handleSave(flat: string, complex: string, tower: string) {
    const newPlace = addPlace(flat, complex, tower)
    setLocalPlaces(prev => [newPlace, ...prev])
    toast.success('Place added', `${flat} at ${complex} is now pending approval.`)
    return newPlace
  }

  // Apply filters against localPlaces
  const displayed = localPlaces.filter(place => {
    const q = pendingFilters.search.toLowerCase()
    if (q && !place.flat.toLowerCase().includes(q) &&
             !place.complex.toLowerCase().includes(q)) return false
    if (pendingFilters.tower   && place.tower   !== pendingFilters.tower)   return false
    if (pendingFilters.complex && place.complex !== pendingFilters.complex) return false
    if (pendingFilters.status  && place.status  !== pendingFilters.status)  return false
    return true
  })

  return (
    <div className="space-y-4 animate-fade-up">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sage-50 flex items-center justify-center">
            <MapPin size={18} className="text-sage-600" />
          </div>
          <div>
            <h1 className="font-display font-bold text-stone-800 text-lg leading-none">
              My Places
            </h1>
            <p className="text-xs font-body text-stone-400 mt-0.5">
              Manage registered flats, offices and common areas
            </p>
          </div>
        </div>

        <button
          onClick={openModal}
          className="btn-primary btn btn-md self-start sm:self-auto"
        >
          <Plus size={15} />
          Add Place
        </button>
      </div>

      {/* ── Summary Chips ── */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Total',    count: localPlaces.length,                               color: 'bg-stone-100 text-stone-600'   },
          { label: 'Approved', count: localPlaces.filter(p => p.status === 'approved').length, color: 'bg-green-50 text-green-700'   },
          { label: 'Pending',  count: localPlaces.filter(p => p.status === 'pending').length,  color: 'bg-amber-50 text-amber-700'  },
          { label: 'Rejected', count: localPlaces.filter(p => p.status === 'rejected').length, color: 'bg-red-50 text-red-600'      },
        ].map(chip => (
          <span
            key={chip.label}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold',
              chip.color,
            )}
          >
            {chip.label}
            <span className="font-mono font-bold">{chip.count}</span>
          </span>
        ))}
      </div>

      {/* ── Filters ── */}
      <PlacesFilterBar
        pending={pendingFilters}
        onUpdate={updatePending}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      {/* ── Table ── */}
      <PlacesTable places={displayed} />

      {/* ── Modal ── */}
      <AddPlaceModal
        isOpen={isOpen}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  )
}
