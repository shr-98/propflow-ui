// ─── Navigation Types ────────────────────────────────────────────────────────

export type NavItemId =
  | 'lead-activity'
  | 'leads'
  | 'campaigns'
  | 'pms'
  | 'incidents'
  | 'snag360'
  | 'places'
  | 'reports'
  | 'settings'

export interface NavItem {
  id: NavItemId
  label: string
  icon: string          // lucide icon name
  badge?: number        // notification count
  children?: NavItem[]
}

// ─── Place / Property Types ──────────────────────────────────────────────────

export type PlaceStatus = 'approved' | 'pending' | 'rejected' | 'inactive'

export interface Place {
  id: string
  flat: string
  complex: string
  tower?: string
  staffCount: number
  vehicleCount: number
  createdOn: string     // ISO date string
  status: PlaceStatus
  createdBy?: string
}

export interface PlaceFilters {
  search: string
  tower: string
  complex: string
  status: PlaceStatus | ''
}

// ─── User / Auth Types ───────────────────────────────────────────────────────

export interface CurrentUser {
  id: string
  name: string
  email: string
  role: string
  workspace: string
  avatarInitials: string
}

// ─── UI State Types ──────────────────────────────────────────────────────────

export interface SidebarState {
  collapsed: boolean
  mobileOpen: boolean
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
}
