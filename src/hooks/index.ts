import { useState, useCallback, useMemo } from 'react'
import type { PlaceFilters, PlaceStatus, SidebarState } from '@/types'
import { MOCK_PLACES } from '@/lib/mockData'

// ─── useSidebar ───────────────────────────────────────────────────────────────
export function useSidebar() {
  const [state, setState] = useState<SidebarState>({
    collapsed:   false,
    mobileOpen:  false,
  })

  const toggleCollapse = useCallback(() =>
    setState(s => ({ ...s, collapsed: !s.collapsed })), [])

  const toggleMobile = useCallback(() =>
    setState(s => ({ ...s, mobileOpen: !s.mobileOpen })), [])

  const closeMobile = useCallback(() =>
    setState(s => ({ ...s, mobileOpen: false })), [])

  return { state, toggleCollapse, toggleMobile, closeMobile }
}

// ─── usePlaces ────────────────────────────────────────────────────────────────
export function usePlaces() {
  const [filters, setFilters] = useState<PlaceFilters>({
    search:  '',
    tower:   '',
    complex: '',
    status:  '',
  })

  const [pendingFilters, setPendingFilters] = useState<PlaceFilters>(filters)

  const updatePending = useCallback(
    (key: keyof PlaceFilters, value: string) =>
      setPendingFilters(f => ({ ...f, [key]: value })),
    [],
  )

  const applyFilters = useCallback(() => {
    setFilters(pendingFilters)
  }, [pendingFilters])

  const resetFilters = useCallback(() => {
    const empty: PlaceFilters = { search: '', tower: '', complex: '', status: '' }
    setFilters(empty)
    setPendingFilters(empty)
  }, [])

  const filteredPlaces = useMemo(() => {
    return MOCK_PLACES.filter(place => {
      const q = filters.search.toLowerCase()
      if (q && !place.flat.toLowerCase().includes(q) &&
               !place.complex.toLowerCase().includes(q)) return false
      if (filters.tower   && place.tower   !== filters.tower)   return false
      if (filters.complex && place.complex !== filters.complex)  return false
      if (filters.status  && place.status  !== filters.status)   return false
      return true
    })
  }, [filters])

  return {
    filters,
    pendingFilters,
    updatePending,
    applyFilters,
    resetFilters,
    filteredPlaces,
  }
}

// ─── useDisclosure ────────────────────────────────────────────────────────────
export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial)
  const open    = useCallback(() => setIsOpen(true),  [])
  const close   = useCallback(() => setIsOpen(false), [])
  const toggle  = useCallback(() => setIsOpen(o => !o), [])
  return { isOpen, open, close, toggle }
}

// ─── useAddPlace ──────────────────────────────────────────────────────────────
export function useAddPlace() {
  const [places, setPlaces] = useState(MOCK_PLACES)

  const addPlace = useCallback((flat: string, complex: string, tower: string) => {
    const newPlace = {
      id:           `pl_${Date.now()}`,
      flat,
      complex,
      tower,
      staffCount:   0,
      vehicleCount: 0,
      createdOn:    new Date().toISOString(),
      status:       'pending' as PlaceStatus,
    }
    setPlaces(prev => [newPlace, ...prev])
    return newPlace
  }, [])

  return { places, addPlace }
}
