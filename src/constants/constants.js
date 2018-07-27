export const SETTINGS = {
  DEFAULT_LOCALE: 'en', // locale cookie values must be lowercase
  VALID_LOCALES: ['en', 'es'], // English and spanish
  LOCALE_COOKIE: 'language',
  DAYS_LOCALE_SAVED: 366
};

export const ROUTES = {
  CLOSED_TICKETS: '/tickets/closed',
  DASHBOARD: '/dashboard',
  EMERGENCY: '/emergency',
  LOGIN: '/login',
  PROPERTIES: '/properties',
  PROPERTY_MANAGERS: '/property-managers',
  OUT_OF_OFFICE: '/settings/out-of-office',
  ROOT: '/',
  SETTINGS: '/settings',
  SIGNUP: '/signup',
  TENANTS: '/tenants',
  TICKETS: '/tickets'
};

export const ROLES = {
  ADMIN: 'admin',
  STAFF: 'staff',
  PROPERTY_MANAGER: 'property-manager'
};

export const CARD_TYPES = {
  CLOSED: 'closed',
  FORM: 'form',
  LARGE: 'lg',
  SMALL: 'sm',
  STATUS: 'status',
  TICKET: 'ticket'
};

export const STATUS_OPTIONS = {
  NEW: 'New',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved'
};
