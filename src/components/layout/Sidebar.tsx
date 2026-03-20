/**
 * Sidebar
 * ─────────────────────────────────────────────────────────────────────────────
 * Collapsible primary navigation sidebar.
 *
 * Accessibility:
 *   • role="navigation" + aria-label
 *   • aria-current="page" on active item
 *   • aria-expanded on collapse toggle
 *   • keyboard navigable (focus-visible ring from global CSS)
 *   • Reduced-motion: transitions shortened via @media (prefers-reduced-motion)
 *
 * Responsive:
 *   • Desktop: icon-only collapse mode (64px) ↔ full (240px)
 *   • Mobile: off-canvas overlay (slide-in-left)
 */

import {
  Activity, Users2, Megaphone, Building2, AlertTriangle,
  ScanLine, MapPin, BarChart3, Settings2, ChevronLeft,
  ChevronRight, LogOut, HelpCircle,
} from 'lucide-react'
import type { NavItemId } from '@/types'
import { NAV_ITEMS, CURRENT_USER } from '@/lib/mockData'
import { PropFlowLogo } from '@/components/ui/PropFlowLogo'
import { cn } from '@/lib/utils'

// ─── Icon resolver (avoids dynamic imports) ──────────────────────────────────
const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Activity, Users2, Megaphone, Building2, AlertTriangle,
  ScanLine, MapPin, BarChart3, Settings2,
}

interface SidebarProps {
  activeId:         NavItemId
  collapsed:        boolean
  mobileOpen:       boolean
  onNavigate:       (id: NavItemId) => void
  onToggleCollapse: () => void
  onCloseMobile:    () => void
}

export function Sidebar({
  activeId,
  collapsed,
  mobileOpen,
  onNavigate,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {

  const sidebarContent = (
    <aside
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        'flex flex-col h-full bg-white border-r border-stone-200 shadow-sidebar',
        'transition-all duration-200 ease-smooth',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* ── Logo + Collapse Toggle ── */}
      <div className={cn(
        'flex items-center h-[52px] px-3 border-b border-stone-100',
        collapsed ? 'justify-center' : 'justify-between',
      )}>
        <PropFlowLogo collapsed={collapsed} />
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          className={cn(
            'btn-ghost btn btn-sm rounded-lg',
            collapsed && 'hidden',
          )}
        >
          {collapsed
            ? <ChevronRight size={16} />
            : <ChevronLeft  size={16} />
          }
        </button>
      </div>

      {/* ── Workspace badge ── */}
      {!collapsed && (
        <div className="mx-3 mt-3 mb-1 px-3 py-2 rounded-lg bg-sage-50 border border-sage-100">
          <p className="text-2xs font-body font-medium text-sage-600 uppercase tracking-widest">
            Workspace
          </p>
          <p className="text-xs font-body font-semibold text-sage-800 mt-0.5 truncate">
            {CURRENT_USER.workspace}
          </p>
        </div>
      )}

      {/* ── Nav Items ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const Icon = ICON_MAP[item.icon]
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                'nav-link w-full text-left',
                isActive && 'nav-link-active',
                collapsed && 'justify-center px-2',
              )}
            >
              {Icon && (
                <Icon
                  size={16}
                  className={cn(
                    'flex-shrink-0 transition-colors',
                    isActive ? 'text-sage-600' : 'text-stone-400',
                  )}
                />
              )}
              {!collapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
              {!collapsed && item.badge != null && (
                <span className="ml-auto flex-shrink-0 min-w-[18px] h-[18px] px-1
                                  rounded-full bg-sage-500 text-white
                                  text-2xs font-mono font-medium
                                  flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* ── Bottom Actions ── */}
      <div className={cn(
        'border-t border-stone-100 px-2 py-2 space-y-0.5',
      )}>
        <button
          className={cn('nav-link w-full text-left', collapsed && 'justify-center px-2')}
          title={collapsed ? 'Help' : undefined}
        >
          <HelpCircle size={16} className="flex-shrink-0 text-stone-400" />
          {!collapsed && <span>Help & Support</span>}
        </button>
        <button
          className={cn('nav-link w-full text-left text-red-400 hover:bg-red-50 hover:text-red-600',
                         collapsed && 'justify-center px-2')}
          title={collapsed ? 'Sign out' : undefined}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>

      {/* ── User Avatar (bottom) ── */}
      <div className={cn(
        'flex items-center gap-2.5 p-3 border-t border-stone-100',
        collapsed && 'justify-center',
      )}>
        <div className="w-8 h-8 rounded-full bg-sage-500 flex items-center justify-center
                        flex-shrink-0 text-white text-xs font-display font-bold">
          {CURRENT_USER.avatarInitials}
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-body font-medium text-stone-800 truncate">
              {CURRENT_USER.name}
            </p>
            <p className="text-2xs font-body text-stone-400 truncate">
              {CURRENT_USER.role}
            </p>
          </div>
        )}
      </div>
    </aside>
  )

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:flex h-screen sticky top-0">
        {sidebarContent}
        {/* Collapse trigger when fully collapsed */}
        {collapsed && (
          <button
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="absolute left-14 top-[14px] w-5 h-5 rounded-full
                       bg-white border border-stone-200 shadow-card
                       flex items-center justify-center
                       text-stone-400 hover:text-sage-600 hover:border-sage-300
                       transition-all z-10"
          >
            <ChevronRight size={10} />
          </button>
        )}
      </div>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="lg:hidden fixed left-0 top-0 h-full z-50 animate-slide-in-left">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  )
}
