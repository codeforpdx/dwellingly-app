// GENERIC JAVASCRIPT UTILITIES

// Set login cookie
export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

// Get login cookie if it exists
export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

// Clear login cookie if we logout
export function clearCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Format Date From String
 * @param string
 * @returns new date object formatted using "toLocaleDateString"
 */
export function formatDateFromString(str) {
  const date = new Date(str);
  return date.toLocaleDateString('en-US');
}

/**
 * Format Date so it can be read by a datetime input
 * @param object
 * @returns formatted datetime string for use in datetime input for iOS & webkit browsers
 */
export function formatDatepickerDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  function formatDateNumberWithLeadingZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${date.getFullYear()}-${formatDateNumberWithLeadingZero(
    month
  )}-${formatDateNumberWithLeadingZero(day)}T${formatDateNumberWithLeadingZero(
    hours
  )}:${formatDateNumberWithLeadingZero(minutes)}`;
}

/**
 * Format phone number href value (so that user's can tap to call)
 * @param string
 * @returns proper telephone link/URL
 */
export function formatPhoneNumber(number) {
  return `tel:+${(/^1/g.test(number) ? number : `1${number}`).replace(
    /-/g,
    ''
  )}`;
}

// Get "back" button URL
export function backURL(url, path) {
  // make new array from [this.props.match.]url
  const pathArray = url.split('/');
  // remove last path
  pathArray.pop();
  // return new array for "Go Back" function in case user got here from a link
  // and has no history
  const closeUrl = pathArray.join('/');
  return `${closeUrl}${path ? `/${path}` : ''}`;
}

/**
 * =============================
 * REMOVE ME || FOR TESTING ONLY
 * =============================
 */
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
