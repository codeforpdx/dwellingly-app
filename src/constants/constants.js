export const SITE_URL = 'http://localhost:3000';

export const SETTINGS = {
  DEFAULT_LOCALE: 'en', // locale cookie values must be lowercase
  VALID_LOCALES: ['en', 'es'], // English and spanish
  LOCALE_COOKIE: 'language',
  DAYS_LOCALE_SAVED: 366,
  APOLLO_SERVER: 'https://my-app-kxybtzpvrq.now.sh', // ZEIT: 'https://my-app-kxybtzpvrq.now.sh' | LOCALHOST:  'http://localhost:4000'
  FIREBASE_API: 'https://us-central1-join-thingy-v01.cloudfunctions.net/api/v1'
};

export const ROUTES = {
  ADMIN: '/admin',
  ADMIN_EMERGENCY: '/admin/emergency',
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
  ADD_TENANT: '/admin/add-new-tenant',
  TICKETS: '/tickets',
  USERS: '/users',
  EMERGENCY_NUMBERS: '/emergencyNumbers'
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
  RESOLVED: 'Resolved',
  REOPEN: 'Reopen'
};
