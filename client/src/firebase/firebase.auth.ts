import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from './firebase.config';
import { createUserProfileDocument } from './firebase.firestore';

export { auth };

// ------------------------------
// Sign In - Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
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
