/**
 * Header (TopBar)
 * ─────────────────────────────────────────────────────────────────────────────
 * Responsive top navigation bar.
 * • Mobile: hamburger menu trigger
 * • Desktop: breadcrumb + context switcher + notifications + user menu
 *
 * Accessibility:
 *   • role="banner"
 *   • Notifications button has aria-label with unread count
 *   • Skip-to-main link (visually hidden, focus-visible)
 */

import { Bell, Menu, ChevronDown, Building } from 'lucide-react'
import type { NavItemId } from '@/types'
import { NAV_ITEMS, CURRENT_USER } from '@/lib/mockData'

interface HeaderProps {
  activeId:        NavItemId
  onMobileMenuOpen: () => void
}

export function Header({ activeId, onMobileMenuOpen }: HeaderProps) {
  const activeItem = NAV_ITEMS.find(n => n.id === activeId)
  const totalBadges = NAV_ITEMS.reduce((sum, n) => sum + (n.badge ?? 0), 0)

  return (
    <header
      role="banner"
      className="h-[52px] flex items-center justify-between
                 px-4 bg-white border-b border-stone-200 shadow-nav
                 sticky top-0 z-30"
    >
      {/* Skip link — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
                   focus:z-50 focus:px-3 focus:py-1.5 focus:rounded-lg
                   focus:bg-sage-600 focus:text-white focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      {/* ── Left: Mobile Menu + Breadcrumb ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuOpen}
          aria-label="Open navigation menu"
          className="lg:hidden btn-ghost btn btn-sm"
        >
          <Menu size={18} />
        </button>

        {/* Active section title — acts as breadcrumb */}
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-display font-semibold text-stone-800">
            {activeItem?.label ?? 'Dashboard'}
          </span>
          {activeItem?.badge != null && (
            <span className="badge badge-approved text-2xs">
              {activeItem.badge} new
            </span>
          )}
        </div>
      </div>

      {/* ── Right: Context + Notifications + User ── */}
      <div className="flex items-center gap-2">
        {/* Workspace / office context switcher */}
        <button className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-lg
                            text-xs font-body font-medium text-stone-600
                            border border-stone-200 hover:border-stone-300
                            hover:bg-stone-50 transition-all">
          <Building size={13} className="text-stone-400" />
          <span className="max-w-[140px] truncate">{CURRENT_USER.workspace}</span>
          <ChevronDown size={12} className="text-stone-400 ml-0.5" />
        </button>

        {/* Notifications */}
        <button
          aria-label={`${totalBadges} unread notifications`}
          className="relative btn-ghost btn btn-sm"
        >
          <Bell size={17} />
          {totalBadges > 0 && (
            <span className="absolute -top-0.5 -right-0.5
                              w-4 h-4 rounded-full bg-sage-500 text-white
                              text-2xs font-mono flex items-center justify-center
                              animate-pulse-dot">
              {totalBadges}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <button
          aria-label="User profile menu"
          className="flex items-center gap-2 h-8 pl-1.5 pr-2.5 rounded-lg
                     hover:bg-stone-50 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-sage-500
                          flex items-center justify-center
                          text-white text-2xs font-display font-bold flex-shrink-0">
            {CURRENT_USER.avatarInitials}
          </div>
          <span className="hidden sm:block text-xs font-body font-medium text-stone-700">
            {CURRENT_USER.name.split(' ')[0]}
          </span>
          <ChevronDown size={12} className="text-stone-400" />
        </button>
      </div>
    </header>
  )
}
