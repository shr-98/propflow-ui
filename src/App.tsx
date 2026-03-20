/**
 * App
 * ─────────────────────────────────────────────────────────────────────────────
 * Root application component.
 * Uses simple useState-based routing (no react-router dependency at MVP).
 * Phase 2: swap the activeId state for react-router-dom <Routes>.
 */

import { useState } from 'react'
import type { NavItemId } from '@/types'
import { AppLayout }          from '@/components/layout/AppLayout'
import { PlacesPage }         from '@/components/places/PlacesPage'
import { LeadActivityPage }   from '@/components/layout/LeadActivityPage'
import { PlaceholderPage }    from '@/components/layout/PlaceholderPage'
import { ToastProvider }      from '@/components/ui/Toast'

function PageRouter({ activeId }: { activeId: NavItemId }) {
  switch (activeId) {
    case 'lead-activity': return <LeadActivityPage />
    case 'places':        return <PlacesPage />
    default:              return <PlaceholderPage id={activeId} />
  }
}

export function App() {
  const [activeId, setActiveId] = useState<NavItemId>('lead-activity')

  return (
    <ToastProvider>
      <AppLayout activeId={activeId} onNavigate={setActiveId}>
        <PageRouter activeId={activeId} />
      </AppLayout>
    </ToastProvider>
  )
}
