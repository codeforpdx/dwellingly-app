import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


// Update with production values
const prodConfig = {
  apiKey: 'AIzaSyCLWEvOVQNE5zdlAtbgaTsNxcU9wABAJiA',
  authDomain: 'join-thingy-v01.firebaseapp.com',
  databaseURL: 'https://join-thingy-v01.firebaseio.com',
  projectId: 'join-thingy-v01',
  messagingSenderId: '111897680703',
};

// development values
const devConfig = {
  apiKey: 'AIzaSyCLWEvOVQNE5zdlAtbgaTsNxcU9wABAJiA',
  authDomain: 'join-thingy-v01.firebaseapp.com',
  databaseURL: 'https://join-thingy-v01.firebaseio.com',
  projectId: 'join-thingy-v01',
  messagingSenderId: '111897680703',
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export default {
  auth,
};
