import { takeLatest, call, put } from 'redux-saga/effects';

// FIREBASE
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from 'firebase/firebase.utils';

// ACTION TYPES
import { FETCH_COLLECTIONS_START } from './shop.types';

// REDUX ACTIONS
import { fetchCollectionsSuccess, fetchCollectionsFail } from './shop.actions';

function* fetchCollectionsAsync() {
  try {
    const collectionsRef = firestore.collection('collections');

    const snapshot = yield collectionsRef.get();

    // first argument of call is a function and the next arguments will be passed in a args of that function
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      collectionsRef,
      snapshot,
      'items'
    );

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFail(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
