import firebase from 'firebase';

// Sign Up
export function doCreateUserWithEmailAndPassword(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password);
}

// Sign In
export function doSignInWithEmailAndPassword(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password);
}

// Sign out
export function doSignOut() {
  firebase.auth().signOut();
}

// Password Reset
export function doPasswordReset(email) {
  firebase.auth().sendPasswordResetEmail(email);
}

// Password Change
export function doPasswordUpdate(password) {
  firebase.auth().currentUser.updatePassword(password);
}
