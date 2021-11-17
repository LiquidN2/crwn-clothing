// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

import { UserType } from '../models/User';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

// ------------------------------------------
// AUTHENTICATION

// Google Sign In
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () =>
  await signInWithPopup(auth, googleProvider);

export const signOutAsync = async () => await signOut(auth);

export const createUserProfileDocument = async (
  userAuth: User | null,
  additionalData?: { [key: string]: any }
) => {
  try {
    if (!userAuth) throw 'No user auth object';

    // check if user exists in firestore
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    // if exists, return the userDocRef
    if (userDocSnapshot.exists()) return userDocRef;

    // if not, create user in firestore and then return the userDocRef
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const docData = { displayName, email, createdAt, ...additionalData };
    return setDoc(userDocRef, docData);
  } catch (err: any) {
    console.log('unable to create user', err);
  }
};

// ------------------------------------------
// FIRESTORE
export const getCollections = async () => {
  const snapshot = await getDocs(collection(db, 'collections'));
  // snapshot.forEach(doc => console.log(doc.data()));
};

export const getUserById = async (uid: string) => {
  const userDocRef = doc(db, 'users', uid);
  const userDocSnapshot = await getDoc(userDocRef);
  return {
    id: userDocSnapshot.id,
    ...userDocSnapshot.data(),
  };
};
