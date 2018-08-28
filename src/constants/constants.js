/* Settings are used for various application-specific settings like language or application name */
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

/* Routes to get throughout the applicaiton, this way we only have to change URLs in one place */
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


/* 
  Endpoints for data in the application. Should all have standard CRUD functions 
  Without UID, gets all of something, with UID:  will read, update, or delete specific something
*/
export const ENDPOINTS = {
  EMERGENCY_NUMBER:  `${SETTINGS.API_SERVER}/api/${SETTINGS.API_VERSION}/emergencyNumbers/`,
  LEASE: `${SETTINGS.API_SERVER}/api/${SETTINGS.API_VERSION}/lease/`, 
  PROPERTY:  `${SETTINGS.API_SERVER}/api/${SETTINGS.API_VERSION}/properties/`, 
  TENANT:  `${SETTINGS.API_SERVER}/api/${SETTINGS.API_VERSION}/tenants/`, 
  TICKET: `${SETTINGS.API_SERVER}/api/${SETTINGS.API_VERSION}/tickets/`, 
  USER: `${SETTINGS.API_SERVER}/api/${SETTINGS.API_VERSION}/users/`, 
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
