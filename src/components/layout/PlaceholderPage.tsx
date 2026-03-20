/**
 * PlaceholderPage
 * Skeleton screen for sections not yet implemented.
 * Shows a consistent "coming soon" state per nav section.
 */

import {
  Users2, Megaphone, Building2, AlertTriangle,
  ScanLine, BarChart3, Settings2, Construction,
} from 'lucide-react'
import type { NavItemId } from '@/types'

const PAGE_META: Partial<Record<NavItemId, { icon: React.FC<{ size?: number; className?: string }>; desc: string }>> = {
  leads:      { icon: Users2,         desc: 'CRM leads, pipeline management and follow-ups'  },
  campaigns:  { icon: Megaphone,      desc: 'Marketing campaigns, bulk messaging and analytics' },
  pms:        { icon: Building2,      desc: 'Property maintenance schedules and work orders'  },
  incidents:  { icon: AlertTriangle,  desc: 'Incident reporting, escalation and resolution'   },
  snag360:    { icon: ScanLine,       desc: 'Snagging reports, floor plan overlays and audits' },
  reports:    { icon: BarChart3,      desc: 'Export reports, dashboards and data visualisation' },
  settings:   { icon: Settings2,     desc: 'Workspace preferences, roles and integrations'   },
}

interface PlaceholderPageProps {
  id: NavItemId
}

export function PlaceholderPage({ id }: PlaceholderPageProps) {
  const meta = PAGE_META[id]
  const Icon = meta?.icon ?? Construction

  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-up">
      <div className="w-16 h-16 rounded-2xl bg-sage-50 flex items-center justify-center mb-5">
        <Icon size={28} className="text-sage-500" />
      </div>
      <h2 className="font-display font-bold text-stone-700 text-xl mb-2">
        Coming in Phase 2
      </h2>
      <p className="font-body text-stone-400 text-sm max-w-xs text-center leading-relaxed">
        {meta?.desc ?? 'This section is under active development.'}
      </p>
      <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-stone-400 text-xs font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
        In progress
      </div>
    </div>
  )
}
