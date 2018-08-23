export const SETTINGS = {
  DEFAULT_LOCALE: 'en', // locale cookie values must be lowercase
  VALID_LOCALES: ['en', 'es'], // English and spanish
  LOCALE_COOKIE: 'language',
  DAYS_LOCALE_SAVED: 366,

  APOLLO_SERVER: 'https://my-app-kxybtzpvrq.now.sh', // ZEIT: 'https://my-app-kxybtzpvrq.now.sh' | LOCALHOST:  'http://localhost:4000'
  API_SERVER: 'https://us-central1-join-thingy-v01.cloudfunctions.net/',

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
  TICKETS: '/tickets'
};

export const ENDPOINTS = {
  USER: `${SETTINGS.API_SERVER}/api/v1/users/`, // Without ID, gets all users, with will read, update, or delete specific user
};

export const HTTP_METHODS = {
  GET: "get",         // Get something
  DELETE: "delete",   // Remove something 
  POST: "post",       // Create something
  PUT: "put",         // Archive something
  PATCH: "patch"      // Update something
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
