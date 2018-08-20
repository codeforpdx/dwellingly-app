export const SETTINGS = {
  DEFAULT_LOCALE: 'en', // locale cookie values must be lowercase
  VALID_LOCALES: ['en', 'es'], // English and spanish
  LOCALE_COOKIE: 'language',
  DAYS_LOCALE_SAVED: 366,

  APOLLO_SERVER: 'https://my-app-kxybtzpvrq.now.sh', // ZEIT: 'https://my-app-kxybtzpvrq.now.sh' | LOCALHOST:  'http://localhost:4000'

  ORGANIZATION: 'JOIN',
  APP_NAME: 'Messenger',
  DOMAIN: 'messenger.joinpdx.org',
  CONTACT_EMAIL: 'info@joinpdx.org',
};

export const ROUTES = {
  ADMIN: '/admin',
  ADMIN_EMERGENCY: '/admin/emergency',
  CLOSED_TICKETS: '/tickets/closed',
  DASHBOARD: '/dashboard',
  EMERGENCY: '/emergency',
  LOGIN: '/login',
  PRIVACY: '/privacy-policy',
  PROPERTIES: '/properties',
  PROPERTY_MANAGERS: '/property-managers',
  OUT_OF_OFFICE: '/settings/out-of-office',
  ROOT: '/',
  SETTINGS: '/settings',
  SIGNUP: '/signup',
  TENANTS: '/tenants',
  TERMS_CONDITIONS: '/terms-conditions',
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
  RESOLVED: 'Resolved',
  CLOSED: 'Closed'
};
