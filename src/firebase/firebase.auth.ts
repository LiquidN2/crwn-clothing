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
export const signOutAsync = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (err) {
    throw err;
  }
};

// ------------------------------
// Sign In - Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async (): Promise<void> => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    throw err;
  }
};

// ------------------------------
// Sign In - Email & Password
export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
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
}): Promise<void> => {
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
