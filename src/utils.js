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

// Format Date so it can be read by a datetime input
export function formatDatepickerDate(date) {
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const newDate = `${date.getFullYear()}-${
    month < 10 ? '0' + month : month
  }-${date.getDate()}T${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
  return newDate;
}

// Format phone number href value (so that user's can tap to call)
export function formatPhoneNumber(number) {
  return `tel:+${(/^1/g.test(number) ? number : `1${number}`).replace(
    /-/g,
    ''
  )}`;
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
