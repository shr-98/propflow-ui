import type { Place, CurrentUser, NavItem } from '@/types'

// ─── Navigation Structure ─────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { id: 'lead-activity', label: 'Lead Activity', icon: 'Activity',   badge: 3 },
  { id: 'leads',         label: 'Leads',          icon: 'Users2' },
  { id: 'campaigns',     label: 'Campaigns',      icon: 'Megaphone' },
  { id: 'pms',           label: 'PMS',            icon: 'Building2' },
  { id: 'incidents',     label: 'Incidents',      icon: 'AlertTriangle', badge: 2 },
  { id: 'snag360',       label: 'Snag 360',       icon: 'ScanLine' },
  { id: 'places',        label: 'My Places',      icon: 'MapPin' },
  { id: 'reports',       label: 'Reports',        icon: 'BarChart3' },
  { id: 'settings',      label: 'Settings',       icon: 'Settings2' },
]

// ─── Current User ─────────────────────────────────────────────────────────────
export const CURRENT_USER: CurrentUser = {
  id:               'u_001',
  name:             'Shrey Sharma',
  email:            'shrey.sharma@propflow.in',
  role:             'FM',
  workspace:        'Verdant Living Demo',
  avatarInitials:   'SS',
}

// ─── Tower / Complex Options ──────────────────────────────────────────────────
export const TOWER_OPTIONS = [
  { value: 'T1',  label: 'Tower 1' },
  { value: 'T2',  label: 'Tower 2' },
  { value: 'T3',  label: 'Tower 3 – Annex' },
]

export const COMPLEX_OPTIONS = [
  { value: 'verdant-hq',    label: 'Verdant Living HQ' },
  { value: 'verdant-demo',  label: 'Living Demo' },
  { value: 'hill-side-2',   label: 'Hill Side 2' },
]

// ─── Places Mock Data ─────────────────────────────────────────────────────────
export const MOCK_PLACES: Place[] = [
  {
    id:           'pl_001',
    flat:         'HO – Office',
    complex:      'Verdant Living HQ',
    tower:        'T1',
    staffCount:   6,
    vehicleCount: 0,
    createdOn:    '2023-08-04T12:31:00',
    status:       'approved',
    createdBy:    'admin',
  },
  {
    id:           'pl_002',
    flat:         'B – 101',
    complex:      'Living Demo',
    tower:        'T2',
    staffCount:   4,
    vehicleCount: 0,
    createdOn:    '2023-07-03T12:12:00',
    status:       'approved',
    createdBy:    'Shrey Sharma',
  },
  {
    id:           'pl_003',
    flat:         '– Office',
    complex:      'Hill Side 2',
    tower:        'T3',
    staffCount:   0,
    vehicleCount: 0,
    createdOn:    '2023-03-16T11:50:00',
    status:       'approved',
    createdBy:    'admin',
  },
  {
    id:           'pl_004',
    flat:         '– Soc_office',
    complex:      'Living Demo',
    tower:        'T1',
    staffCount:   8,
    vehicleCount: 3,
    createdOn:    '2022-11-05T13:58:00',
    status:       'approved',
    createdBy:    'Shrey Sharma',
  },
  {
    id:           'pl_005',
    flat:         'FM – Office',
    complex:      'Living Demo',
    tower:        'T2',
    staffCount:   19,
    vehicleCount: 0,
    createdOn:    '2022-10-27T16:31:00',
    status:       'approved',
    createdBy:    'Shrey Sharma',
  },
  {
    id:           'pl_006',
    flat:         'C – 204',
    complex:      'Verdant Living HQ',
    tower:        'T1',
    staffCount:   2,
    vehicleCount: 1,
    createdOn:    '2024-01-15T09:22:00',
    status:       'pending',
    createdBy:    'Amit Kumar',
  },
  {
    id:           'pl_007',
    flat:         'D – Penthouse',
    complex:      'Living Demo',
    tower:        'T3',
    staffCount:   0,
    vehicleCount: 2,
    createdOn:    '2024-02-28T14:05:00',
    status:       'rejected',
    createdBy:    'admin',
  },
]
