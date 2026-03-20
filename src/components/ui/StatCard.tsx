/**
 * StatCard
 * Reusable KPI metric card with trend indicator.
 * Used on Lead Activity, Dashboard overview, etc.
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label:      string
  value:      string | number
  unit?:      string
  trend?:     number          // positive = up, negative = down, 0 = flat
  trendLabel?: string
  icon?:      React.FC<{ size?: number; className?: string }>
  accent?:    'sage' | 'amber' | 'red' | 'blue'
  className?: string
}

const ACCENT_MAP = {
  sage:  { bg: 'bg-sage-50',  icon: 'text-sage-600',  value: 'text-sage-700'  },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', value: 'text-amber-700' },
  red:   { bg: 'bg-red-50',   icon: 'text-red-500',   value: 'text-red-700'   },
  blue:  { bg: 'bg-blue-50',  icon: 'text-blue-600',  value: 'text-blue-700'  },
}

export function StatCard({
  label,
  value,
  unit,
  trend,
  trendLabel,
  icon: Icon,
  accent = 'sage',
  className,
}: StatCardProps) {
  const colors = ACCENT_MAP[accent]

  const TrendIcon =
    trend == null    ? null :
    trend  > 0       ? TrendingUp :
    trend  < 0       ? TrendingDown : Minus

  const trendColor =
    trend == null    ? '' :
    trend  > 0       ? 'text-green-600' :
    trend  < 0       ? 'text-red-500' : 'text-stone-400'

  return (
    <div className={cn('card p-4 flex flex-col gap-3', className)}>
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-body font-semibold text-stone-500 uppercase tracking-wider leading-tight">
          {label}
        </p>
        {Icon && (
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', colors.bg)}>
            <Icon size={15} className={colors.icon} />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-end gap-1.5">
        <span className={cn('font-display font-bold text-2xl leading-none', colors.value)}>
          {value}
        </span>
        {unit && (
          <span className="font-body text-xs text-stone-400 mb-0.5 leading-none">{unit}</span>
        )}
      </div>

      {/* Trend */}
      {TrendIcon && trend != null && (
        <div className={cn('flex items-center gap-1 text-xs font-body font-medium', trendColor)}>
          <TrendIcon size={13} />
          <span>
            {Math.abs(trend)}% {trendLabel ?? (trend > 0 ? 'increase' : 'decrease')}
          </span>
        </div>
      )}
    </div>
  )
}
