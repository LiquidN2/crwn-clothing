// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  query,
  CollectionReference,
} from 'firebase/firestore';

import { auth, firestore } from './firebase.config';
import { UserDoc, userConverter } from '../models/User';
import { collectionConverter, CollectionDoc } from '../models/Collection';
import { itemConverter, ShopItem } from '../models/ShopItem';
import { ShopData } from '../redux/shop/shop.reducer';
import { UpdateCollectionsAction } from '../redux/shop/shop.actions';

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

// ---------------------------------
// COLLECTIONS DATA
export const getCollectionItems = async (
  collectionId: string
): Promise<ShopItem[]> => {
  const collectionsRef = collection(firestore, 'collections').withConverter(
    collectionConverter
  );

  const itemsRef = collection(
    collectionsRef,
    collectionId,
    'items'
  ).withConverter(itemConverter);

  const itemsQuery = query(itemsRef);
  const querySnapshot = await getDocs(itemsQuery);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data().toObj());
};

export const watchCollectionItems = async (
  collectionId: string
): Promise<ShopItem[]> => {
  const collectionsRef = collection(firestore, 'collections').withConverter(
    collectionConverter
  );

  const itemsRef = collection(
    collectionsRef,
    collectionId,
    'items'
  ).withConverter(itemConverter);

  const itemsQuery = query(itemsRef);

  return new Promise((resolve, reject) => {
    try {
      onSnapshot(itemsQuery, querySnapshot => {
        const items = querySnapshot.docs.map(
          (docSnapshot): ShopItem => docSnapshot.data().toObj()
        );

        if (!items) reject('No items in this collection');

        resolve(items);
      });
    } catch (err) {
      throw err;
    }
  });
};

export const getCollections = async () => {
  try {
    const collectionsRef = collection(firestore, 'collections').withConverter(
      collectionConverter
    );
    const querySnapshot = await getDocs(collectionsRef);

    const collections: ShopData = {};

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      const docSnapshot = querySnapshot.docs[i];
      const { title } = docSnapshot.data();
      const routeName = encodeURI(title.toLocaleLowerCase());
      const firebaseId = docSnapshot.id;
      const items = await getCollectionItems(docSnapshot.id);

      collections[title.toLocaleLowerCase()] = {
        id: firebaseId,
        title,
        routeName,
        items,
      };
    }

    return collections;
  } catch (err) {
    throw err;
  }
};

export const watchCollections = async (): Promise<ShopData> => {
  return new Promise((resolve, reject) => {
    const collectionsRef = collection(firestore, 'collections').withConverter(
      collectionConverter
    );

    const collectionsQuery = query(collectionsRef);

    onSnapshot(collectionsQuery, async querySnapshot => {
      const collections: ShopData = {};

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        const docSnapshot = querySnapshot.docs[i];
        const { title } = docSnapshot.data();
        const routeName = encodeURI(title.toLocaleLowerCase());
        const firebaseId = docSnapshot.id;
        const items = await getCollectionItems(docSnapshot.id);

        collections[title.toLocaleLowerCase()] = {
          id: firebaseId,
          title,
          routeName,
          items,
        };
      }

      resolve(collections);
    });
  });
};

export const onCollectionsChange = (
  updateCollections: (collections: ShopData) => UpdateCollectionsAction,
  setLoadingCollections: Function
) => {
  setLoadingCollections(true);

  const collectionsRef = collection(firestore, 'collections').withConverter(
    collectionConverter
  );

  const collectionsQuery = query(collectionsRef);

  return onSnapshot(collectionsQuery, async querySnapshot => {
    const collections: ShopData = {};

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      const docSnapshot = querySnapshot.docs[i];
      const { title } = docSnapshot.data();
      const routeName = encodeURI(title.toLocaleLowerCase());
      const firebaseId = docSnapshot.id;
      const items = await getCollectionItems(docSnapshot.id);

      collections[title.toLocaleLowerCase()] = {
        id: firebaseId,
        title,
        routeName,
        items,
      };
    }

    updateCollections(collections);
    setLoadingCollections(false);
  });
};
