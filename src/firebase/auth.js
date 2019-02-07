import firebase from 'firebase/app';
import 'firebase/auth';
import 'whatwg-fetch';
import Cookies from 'universal-cookie';
import store, { history } from '../store';
import { ENDPOINTS, HTTP_METHODS, ROUTES } from '../constants/constants';

// REDUCERS
import {
  initiateFirebaseCall,
  addError,
  getAuthDetailsFromFirebase,
  setUserFromFirebaseEmail,
  setUserFromGoogle,
  addCustomUserData,
  clearUser,
  initiateUserPasswordEmail,
  resetUserPasswordEmail,
  resetUserPasswordEmailError
} from '../dux/user';

const provider = new firebase.auth.GoogleAuthProvider();

// User data from Firestore
export function getFirestoreUserData(uid, accountSource) {
  console.log('get user data');
  store.dispatch(initiateFirebaseCall());
  const userEndpoint = `${ENDPOINTS.USER}${uid}`;
  console.log('getting user at ', userEndpoint);
  fetch(userEndpoint, {
    method: HTTP_METHODS.GET
  })
    .then(response => response.json())
    .then(json => {
      const userData = json;
      console.log(json);
      if (userData) {
        store.dispatch(addCustomUserData(userData, accountSource, uid));
      }
      // Don't need to set user here, will get picked up by UserControl as auth changes!
      // store.dispatch(setUser(json, 'email'))
    })
    .catch(error => {
      store.dispatch(addError(error));
    });
}

// Sign Up a user with email address and password
export function doCreateUserWithEmailAndPassword(
  firstName,
  lastName,
  email,
  password
) {
  store.dispatch(initiateFirebaseCall());
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      fetch(ENDPOINTS.USER, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          id: response.user.uid
        })
      });
    })
    .then(response => response.json())
    .then(json => {
      store.dispatch(setUserFromFirebaseEmail(json));
    })
    .catch(error => {
      // Handle Errors here.
      store.dispatch(addError(error));
    });
}

// Create a user with an email and password, also create authentication in Firestore
export function doCreateStaffUser(
  firstName,
  lastName,
  email,
  phone,
  password,
  role
) {
  store.dispatch(initiateFirebaseCall());
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      fetch(ENDPOINTS.USER, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          id: response.user.uid
        })
      });
    })
    .then(response => response.json())
    .then(json => {
      const newUser = {
        ...json,
        phone,
        role,
        leaseIds: ['johnny_test'],
        title: ''
      };
      store.dispatch(setUserFromFirebaseEmail(newUser));
    })
    .catch(error => {
      // Handle Errors here.
      store.dispatch(addError(error));
    });
}

// Sign In user with email address and password
export function doSignInWithEmailAndPassword(email, password) {
  store.dispatch(initiateFirebaseCall());
  console.log('login with username and password');
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      // fetch user data
      console.log(response);
      const userEndpoint = `${ENDPOINTS.USER}${response.user.uid}`;
      fetch(userEndpoint, {
        method: HTTP_METHODS.GET
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          store.dispatch(getAuthDetailsFromFirebase(json, 'password'));
          this.setUserCookies(json);
          // Don't need to set user here, will get picked up by UserControl as auth changes!
          // store.dispatch(setUser(json, 'email'))
        })
        .catch(error => {
          store.dispatch(addError(error));
        });
    })
    .catch(error => {
      // Handle Errors here.
      store.dispatch(addError(error));
    });
}

// Sign in user with Google OAuth
export function doSignInWithGoogle() {
  firebase.auth().useDeviceLanguage();
  store.dispatch(initiateFirebaseCall());
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // The signed-in user info.
      setUserFromGoogle(result);
    })
    .catch(error => {
      // Handle Errors here.
      store.dispatch(addError(error));
      // ...
    });
}

// Get user profile info
export function getUserProfile() {
  const { currentUser } = firebase.auth().currentUser;
  let name;
  let email;
  let photoUrl;
  let emailVerified;
  let uid;

  if (currentUser !== null) {
    ({ name } = currentUser.displayName);
    ({ email } = currentUser.email);
    ({ photoUrl } = currentUser.photoURL);
    ({ emailVerified } = currentUser.emailVerified);
    ({ uid } = currentUser.uid);
    console.log(name, email, photoUrl, uid, emailVerified);
  }
}

// Sign out
export function doSignOut() {
  firebase
    .auth()
    .signOut()
    .then(store.dispatch(clearUser()), history.push(ROUTES.LOGIN));
}

// Password Reset
export function doPasswordReset(email) {
  store.dispatch(initiateUserPasswordEmail());
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(response => {
      store.dispatch(resetUserPasswordEmail(response));
    })
    .catch(error => {
      store.dispatch(resetUserPasswordEmailError(error));
    });
}

// Password Change
export function doPasswordUpdate(password) {
  firebase.auth().currentUser.updatePassword(password);
}

export function setUserCookies(newUser) {
  console.log('setting cookies!');
  console.log(newUser);
  const cookies = new Cookies();
  const cookieExpiration = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );
  const userEmailCookieExist = cookies.get('messengerUser');
  const userIDCookieExist = cookies.get('messengerUserId');
  const userRoleExist = cookies.get('userRole');
  if (newUser && newUser.id) {
    if (!userEmailCookieExist) {
      cookies.set('messengerUser', newUser.email, {
        path: '/',
        expires: cookieExpiration
      });
    }
    if (!userIDCookieExist) {
      cookies.set('messengerUserId', newUser.id, {
        path: '/',
        expires: cookieExpiration
      });
    }
    if (!userRoleExist) {
      cookies.set('messengerUserRole', newUser.role, {
        path: '/',
        expires: cookieExpiration
      });
    }
  }
}
