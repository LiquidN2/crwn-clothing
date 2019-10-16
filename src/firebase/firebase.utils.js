import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyArpyzgfpSpFHRXZQcC1FQvX9IogzMjZ14',
  authDomain: 'crwn-db-9d43a.firebaseapp.com',
  databaseURL: 'https://crwn-db-9d43a.firebaseio.com',
  projectId: 'crwn-db-9d43a',
  storageBucket: 'crwn-db-9d43a.appspot.com',
  messagingSenderId: '876320237875',
  appId: '1:876320237875:web:8c4bd22de0feddad447646',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const firestore = firebase.firestore();

// SIGN-IN WITH GOOGLE
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
const signInWithGoogle = async () => await auth.signInWithPopup(provider);

export { auth, firestore, signInWithGoogle, firebase as default };
