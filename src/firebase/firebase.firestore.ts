// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, firestore } from './firebase.config';
import { UserDoc, userConverter } from '../models/User';

const userColRef = collection(firestore, 'users').withConverter(userConverter);

// Create new user in firestore & return user doc ref
export const createUserProfileDocument = async (
  userAuth: User | null,
  additionalData?: {
    displayName?: string;
    emailVerified?: boolean;
  }
) => {
  try {
    if (!userAuth) throw Error('User Auth is not defined');

    // check if user exists in firestore
    const { uid } = userAuth;
    const userDocRef = doc(userColRef, uid);

    const userDocSnapshot = await getDoc(userDocRef);

    // create user in firestore if not existing
    if (!userDocSnapshot.exists()) {
      console.log('creating user in firestore');
      const { email } = userAuth;
      const displayName = userAuth.displayName || additionalData?.displayName;
      const createdAt = new Date();
      if (!email) throw Error('Missing Email');
      await setDoc(userDocRef, new UserDoc(email, displayName, createdAt));
    }

    return userDocRef;
  } catch (err: any) {
    console.log('unable to create user', err);
  }
};

// SignUP
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

// ------------------------------------------
// FIRESTORE
export const getCollections = async () => {
  const snapshot = await getDocs(collection(firestore, 'collections'));
  snapshot.forEach(doc => console.log(doc.data()));
};

export const getUserById = async (uid: string): Promise<UserDoc | null> => {
  try {
    const userDocRef = doc(userColRef, uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) return null;

    return userDocSnapshot.data();
  } catch (err) {
    throw err;
  }
};
