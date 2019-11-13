import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from 'firebase/firebase.utils';

import { GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START } from './user.types';

import { signInSuccess, signInFailure } from './user.actions';

function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapShot = yield userRef.get();
    const userData = yield userSnapShot.data();
    const currentUser = {
      id: userSnapShot.id,
      ...userData,
    };
    yield put(signInSuccess(currentUser));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithEmail(action) {
  // same action from user.reducer
  const {
    emailAndPassword: { email, password },
  } = action;

  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onEmailSignInStart() {
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
