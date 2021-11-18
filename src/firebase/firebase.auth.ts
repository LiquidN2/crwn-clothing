import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from './firebase.config';
import { createUserProfileDocument } from './firebase.firestore';

export { auth };

// ------------------------------
// Sign out
export const signOutAsync = async () => await signOut(auth);

// ------------------------------
// Sign In - Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () =>
  await signInWithPopup(auth, googleProvider);

// ------------------------------
// Sign In - Email & Password
export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// ------------------------------
// Sign Up
export const signUp = async ({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const { user } = userCredential;

    await createUserProfileDocument(user, { displayName });
  } catch (err) {
    throw err;
  }
};
