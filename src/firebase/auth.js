import firebase from 'firebase';

// Sign Up
export function doCreateUserWithEmailAndPassword(email, password) {
  console.log('creating user:', email, password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      console.log('user created'),
    )
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
}

// Sign In
export function doSignInWithEmailAndPassword(email, password) {
  console.log('signing in with', email, password);
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      // Handle Errors here.
      console.log(error.code, error.message);
    });
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
