/**
 * LeadActivityPage
 * ─────────────────────────────────────────────────────────────────────────────
 * Phase 2 dashboard page. Shows KPI cards + a live activity feed.
 */

import {
  Users2, PhoneCall, CalendarCheck, TrendingUp,
  Clock, CheckCircle2, XCircle, Phone,
} from 'lucide-react'
import { StatCard } from '@/components/ui/StatCard'
import { cn } from '@/lib/utils'

const ACTIVITY_FEED = [
  { id: '1', type: 'call',     label: 'Call logged',          name: 'Priya Menon',  unit: 'B-204, Living Demo',  time: '2m ago',   status: 'done' },
  { id: '2', type: 'visit',    label: 'Site visit scheduled', name: 'Rohit Bhat',   unit: 'C-110, Verdant HQ',   time: '18m ago',  status: 'pending' },
  { id: '3', type: 'callback', label: 'Callback requested',   name: 'Anjali Singh', unit: 'D-Penthouse, Demo',   time: '45m ago',  status: 'pending' },
  { id: '4', type: 'call',     label: 'Call logged',          name: 'Dev Kapoor',   unit: 'A-101, Hill Side 2',  time: '1h ago',   status: 'done' },
  { id: '5', type: 'closed',   label: 'Lead closed — won',    name: 'Meera Iyer',   unit: 'FM Office, Demo',     time: '2h ago',   status: 'won' },
  { id: '6', type: 'closed',   label: 'Lead closed — lost',   name: 'Karan Nair',   unit: 'B-302, Verdant HQ',   time: '3h ago',   status: 'lost' },
]

const TYPE_ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  call:     Phone,
  visit:    CalendarCheck,
  callback: Clock,
  closed:   CheckCircle2,
}

const STATUS_STYLES: Record<string, string> = {
  done:    'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  won:     'bg-sage-100  text-sage-700',
  lost:    'bg-red-100   text-red-600',
}

export function LeadActivityPage() {
  return (
    <div className="space-y-6 animate-fade-up">

      {/* Page header */}
      <div>
        <h1 className="font-display font-bold text-stone-800 text-lg">Lead Activity</h1>
        <p className="text-xs font-body text-stone-400 mt-0.5">
          Real-time overview of your CRM pipeline
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Leads"
          value={142}
          trend={12}
          trendLabel="vs last month"
          icon={Users2}
          accent="sage"
        />
        <StatCard
          label="Calls Today"
          value={23}
          trend={5}
          icon={PhoneCall}
          accent="blue"
        />
        <StatCard
          label="Visits Planned"
          value={8}
          trend={-2}
          icon={CalendarCheck}
          accent="amber"
        />
        <StatCard
          label="Conversion"
          value="18"
          unit="%"
          trend={3}
          trendLabel="this week"
          icon={TrendingUp}
          accent="sage"
        />
      </div>

      {/* Activity Feed */}
      <div className="card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-display font-semibold text-stone-700 text-sm">
            Recent Activity
          </h2>
          <span className="badge badge-approved animate-pulse-dot">● Live</span>
        </div>

        <ul role="list" className="divide-y divide-stone-100">
          {ACTIVITY_FEED.map(item => {
            const Icon = TYPE_ICONS[item.type] ?? Phone
            return (
              <li
                key={item.id}
                className="flex items-start gap-3 px-5 py-3.5 hover:bg-stone-50/70
                           transition-colors duration-100 cursor-pointer"
              >
                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={14} className="text-stone-500" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-stone-800">
                    {item.label}
                  </p>
                  <p className="text-xs font-body text-stone-500 truncate mt-0.5">
                    <span className="font-semibold text-stone-700">{item.name}</span>
                    {' · '}{item.unit}
                  </p>
                </div>

                {/* Right: time + badge */}
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="text-2xs font-mono text-stone-400">{item.time}</span>
                  <span className={cn(
                    'text-2xs font-body font-semibold px-2 py-0.5 rounded-full',
                    STATUS_STYLES[item.status],
                  )}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="px-5 py-2.5 border-t border-stone-100">
          <button className="text-xs font-body font-medium text-sage-600 hover:text-sage-700 transition-colors">
            View all activity →
          </button>
        </div>
      </div>
    </div>
  )
}
