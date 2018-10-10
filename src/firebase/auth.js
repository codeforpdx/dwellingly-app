import firebase from 'firebase/app';
import 'firebase/auth';
import 'whatwg-fetch';
import store, { history } from '../store';
import { ENDPOINTS, HTTP_METHODS, ROUTES } from '../constants/constants';

// REDUCERS
import {
  initiateFirebaseCall,
  addError,
  setUserFromFirebaseEmail,
  setUserFromGoogle,
  addCustomUserData,
  clearUser,
  initiateUserPasswordEmail,
  resetUserPasswordEmail,
  resetUserPasswordEmailError,
} from '../dux/user';


const provider = new firebase.auth.GoogleAuthProvider();


// User data from Firestore
export function getFirestoreUserData( uid, accountSource ) {
  store.dispatch(initiateFirebaseCall());
  const userEndpoint = `${ENDPOINTS.USER}${uid}`;
  fetch(userEndpoint, {
    method: HTTP_METHODS.GET,
  }).then((response => response.json()))
    .then((json) => {
      const userData = json;
      console.log(userData);
      if (userData) {
        store.dispatch(addCustomUserData(userData, accountSource, uid))
      }
      // Don't need to set user here, will get picked up by UserControl as auth changes!
      // store.dispatch(setUser(json, 'email'))
    })
    .catch((error) => {
      store.dispatch(addError(error));
    })
  }

// Sign Up a user with email address and password
export function doCreateUserWithEmailAndPassword(firstName, lastName, email, password) {
  store.dispatch(initiateFirebaseCall());
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response) => {
        fetch( ENDPOINTS.USER, {
          method: HTTP_METHODS.POST,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            id: response.user.uid,
          })
        })
      }
    )
    .catch((error) => {
      // Handle Errors here.
      store.dispatch(addError(error));
    });
}

// Sign In user with email address and password
export function doSignInWithEmailAndPassword(email, password) {
  console.log('signing in with', email, password);
  store.dispatch(initiateFirebaseCall());
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response)
        // fetch user data
        const userEndpoint = `${ENDPOINTS.USER}${response.user.uid}`;
        fetch(userEndpoint, {
        method: HTTP_METHODS.GET,
      }).then((response => response.json()))
        .then((json) => {
          console.log(json)
          setUserFromFirebaseEmail(json);
          // Don't need to set user here, will get picked up by UserControl as auth changes!
          // store.dispatch(setUser(json, 'email'))
        })
        .catch((error) => {
          console.log(error.code, error.message);
          store.dispatch(addError(error));
        })
      }
      )
    .catch((error) => {
      // Handle Errors here.
      console.log(error.code, error.message);
      store.dispatch(addError(error));
    });
}

// Sign in user with Google OAuth
export function doSignInWithGoogle() {
  firebase.auth().useDeviceLanguage();
  store.dispatch(initiateFirebaseCall());
  firebase.auth().signInWithPopup(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const userEmail = result.user.email;
    const userUID = result.user.uid;
    // ...
    console.log(result, token, userEmail, userUID);
    setUserFromGoogle(result);
  }).catch((error) => {
    // Handle Errors here.
    const { errorCode } = error.code;
    const { errorMessage } = error.message;
    // The email of the user's account used.
    const { email } = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const { credential } = error.credential;
    console.log(errorCode, errorMessage, email, credential);
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
  firebase.auth().signOut()
    .then(
      store.dispatch(clearUser()),
      history.push(ROUTES.LOGIN)
    );
}

// Password Reset
export function doPasswordReset(email) {
  console.log('reset password for', email);
  store.dispatch(initiateUserPasswordEmail());
  firebase.auth().sendPasswordResetEmail(email).then
    (response => {
      console.log(response)
      store.dispatch(resetUserPasswordEmail())
      }
    )
    .catch((error) => {
      console.log(error.code, error.message);
      store.dispatch(resetUserPasswordEmailError(error));
    })
}

// Password Change
export function doPasswordUpdate(password) {
  firebase.auth().currentUser.updatePassword(password);
}
