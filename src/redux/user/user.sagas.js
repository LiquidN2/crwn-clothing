import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from 'firebase/firebase.utils';

import { GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START } from './user.types';

import {
  googleSignInSuccess,
  googleSignInFailure,
  emailSignInSuccess,
  emailSignInFailure,
} from './user.actions';

function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapShot = yield userRef.get();
    const userData = yield userSnapShot.data();
    const currentUser = {
      id: userSnapShot.id,
      ...userData,
    };
    yield put(googleSignInSuccess(currentUser));
  } catch (error) {
    yield put(googleSignInFailure(error.message));
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
