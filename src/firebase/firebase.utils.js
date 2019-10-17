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

const handleFirebaseSignInError = error => {
  let errorMessage = '';
  switch (error.code) {
    case 'auth/wrong-password':
    case 'auth/invalid-email':
      errorMessage = 'Wrong email or password';
      break;

    case 'auth/user-disabled':
      errorMessage =
        'The user corresponding to the given email has been disabled';
      break;

    case 'auth/user-not-found':
      errorMessage = 'There is no user corresponding to the given email';
      break;

    default:
      errorMessage = error.message;
  }
  alert(errorMessage);
};

const handleFirebaseSignUpError = error => {
  let errorMessage = '';
  switch (error.code) {
    case 'auth/weak-password':
      errorMessage = 'Please try a stronger password';
      break;

    case 'auth/email-already-in-use':
      errorMessage =
        'There is an existing account with that email address.  Please sign in.';
      break;

    case 'auth/invalid-email':
      errorMessage = 'Please make sure email is valid';
      break;

    default:
      errorMessage = error.message;
  }
  alert(errorMessage);
};

export {
  auth,
  firestore,
  signInWithGoogle,
  createUserProfileDocument,
  handleFirebaseSignInError,
  handleFirebaseSignUpError,
  firebase as default,
};
