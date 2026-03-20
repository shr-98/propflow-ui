import { type ClassValue, clsx } from 'clsx'
import type { PlaceStatus } from '@/types'

// ─── Class Merging ───────────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// ─── Date Formatting ─────────────────────────────────────────────────────────
export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ─── Status Helpers ───────────────────────────────────────────────────────────
export function getStatusBadgeClass(status: PlaceStatus): string {
  const map: Record<PlaceStatus, string> = {
    approved: 'badge badge-approved',
    pending:  'badge badge-pending',
    rejected: 'badge badge-rejected',
    inactive: 'badge badge-inactive',
  }
  return map[status]
}

export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ─── ID Generation ────────────────────────────────────────────────────────────
export function generateId(): string {
  return Math.random().toString(36).slice(2, 9)
}

// ─── Debounce ────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
