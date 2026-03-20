/**
 * AppLayout
 * ─────────────────────────────────────────────────────────────────────────────
 * Root layout composing: Sidebar + Header + main content area.
 *
 * Layout grid:
 *   [Sidebar] [Header + Content]
 *
 * The sidebar is sticky on desktop; on mobile it's an off-canvas overlay.
 */

import type { ReactNode } from 'react'
import type { NavItemId } from '@/types'
import { Sidebar } from './Sidebar'
import { Header  } from './Header'
import { useSidebar } from '@/hooks'

interface AppLayoutProps {
  activeId:   NavItemId
  onNavigate: (id: NavItemId) => void
  children:   ReactNode
}

export function AppLayout({ activeId, onNavigate, children }: AppLayoutProps) {
  const { state, toggleCollapse, toggleMobile, closeMobile } = useSidebar()

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden">
      {/* ── Sidebar ── */}
      <Sidebar
        activeId={activeId}
        collapsed={state.collapsed}
        mobileOpen={state.mobileOpen}
        onNavigate={id => { onNavigate(id); closeMobile() }}
        onToggleCollapse={toggleCollapse}
        onCloseMobile={closeMobile}
      />

      {/* ── Main column ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          activeId={activeId}
          onMobileMenuOpen={toggleMobile}
        />

        {/* ── Content area ── */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto focus:outline-none"
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 animate-fade-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
