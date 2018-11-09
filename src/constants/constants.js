/* Settings are used for various application-specific settings like language or application name */
export const SITE_URL = 'http://localhost:3000';
export const SETTINGS = {
  DEFAULT_LOCALE: 'en',         // locale cookie values must be lowercase
  VALID_LOCALES: ['en', 'es'],  // English and Spanish
  LOCALE_COOKIE: 'language',    // name of the language cookie
  DAYS_LOCALE_SAVED: 366,

  API_SERVER: 'https://us-central1-join-thingy-v01.cloudfunctions.net',
  API_VERSION: 'v1',

  ORGANIZATION: 'JOIN',
  APP_NAME: 'Messenger',
  DOMAIN: 'messenger.joinpdx.org',
  CONTACT_EMAIL: 'info@joinpdx.org',
};

/* Routes to get throughout the application, this way we only have to change URLs in one place */
export const ROUTES = {
  ADD_TENANT: '/admin/add-new-tenant',
  ADD_PROPERTY: '/admin/add-new-property',
  ADD_PROPERTY_MANAGER: '/admin/add-new-property-manager',
  ADMIN: '/admin',
  ADMIN_EMERGENCY: '/admin/emergency',
  ADMIN_EMERGENCY_NUMBERS: '/admin/emergencyNumbers',
  AWAITING_ROLE: '/awaiting-role',
  CLOSED_TICKETS: '/tickets/closed',
  DASHBOARD: '/dashboard',
  EMERGENCY: '/emergency',
  EMERGENCY_NUMBERS: '/emergencyNumbers',
  FORGOT_PASSWORD: '/forgot-password',
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
  TICKETS: '/tickets',
  USERS: '/users',
};

export const ROLES = {
  ADMIN: 'admin',
  STAFF: 'staff',
  PROPERTY_MANAGER: 'property-manager'
};

export const ACCORDION_TYPES = {
  TABLE: 'table',
  LIST: 'list',
  SELECT: 'select'
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
  REOPEN: 'Reopen',
};
