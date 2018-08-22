import firebase from 'firebase/app';
import 'firebase/auth';
import store from '../store';
import {
  addError,
} from '../dux/user';

const provider = new firebase.auth.GoogleAuthProvider();

// Sign Up a user with email address and password
export function doCreateUserWithEmailAndPassword(email, password) {
  console.log('creating user:', email, password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      console.log('user created'),
    )
    .catch((error) => {
      // Handle Errors here.
      store.dispatch(addError(error));
      console.log(error);
    });
}

// Sign In user with email address and password
export function doSignInWithEmailAndPassword(email, password) {
  console.log('signing in with', email, password);
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      // Handle Errors here.
      console.log(error.code, error.message);
      store.dispatch(addError(error));
    });
}

// Sign in user with Google OAuth
export function doSignInWithGoogle() {
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const { user } = result.user.email;
    // ...
    console.log(result, token, user);
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
    .then(console.log('loggedout'));
}

// Password Reset
export function doPasswordReset(email) {
  firebase.auth().sendPasswordResetEmail(email);
}

// Password Change
export function doPasswordUpdate(password) {
  firebase.auth().currentUser.updatePassword(password);
}
