// FIREBASE
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from 'firebase/firebase.utils';

// ACTION TYPES
import {
  FETCH_COLLECTIONS_START,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
} from './shop.types';

const fetchCollectionsStart = () => ({
  type: FETCH_COLLECTIONS_START,
});

const fetchCollectionsFail = errorMsg => ({
  type: FETCH_COLLECTIONS_FAILURE,
  errorMsg,
});

const fetchCollectionsSuccess = collectionsMap => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  collectionsMap,
});

export const fetchCollectionsAsync = () => async dispatch => {
  dispatch(fetchCollectionsStart());

  try {
    const collectionsRef = firestore.collection('collections');
    const snapshot = await collectionsRef.get();
    const collectionsMap = await convertCollectionsSnapshotToMap(
      collectionsRef,
      snapshot,
      'items'
    );

    dispatch(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    dispatch(fetchCollectionsFail(error));
  }

  // FIRESTORE OBSERVER
  // const collectionsRef = firestore.collection('collections');
  // collectionsRef.onSnapshot(async snapshot => {
  //   const collectionsMap = await convertCollectionsSnapshotToMap(
  //     collectionsRef,
  //     snapshot,
  //     'items'
  //   );

  //   dispatch(fetchCollectionsSuccess(collectionsMap));
  // }, error => {
  //   dispatch(fetchCollectionsFail(error));
  // });
};
