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

/**
 * create user doc in firestore from userAuth (returned when via Google signed in)
 * @param {object} userAuth        userAuth object returned when signing in with Google
 * @param {object} additionalData  additional user data
 */
const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const {
    uid,
    displayName,
    email,
    emailVerified,
    phoneNumber,
    photoURL,
  } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  // console.log({ snapshot });

  if (!snapshot.exists) {
    const data = {
      displayName,
      email,
      emailVerified,
      phoneNumber,
      photoURL,
      createdAt: new Date(),
      ...additionalData,
    };

    try {
      await userRef.set(data);
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

export {
  auth,
  firestore,
  signInWithGoogle,
  createUserProfileDocument,
  firebase as default,
};
