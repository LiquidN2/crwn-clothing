import { takeLatest, put, all, call } from 'redux-saga/effects';

// FIREBASE
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from 'firebase/firebase.utils';

// REDUX ACTION TYPES
import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION,
  SIGN_OUT_START,
} from './user.types';

// REDUX ACTIONS
import {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from './user.actions';

function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
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

// GOOGLE SIGN-IN
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

// EMAIL SIGN-IN
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

// SIGN UP
function* signUp(action) {
  const {
    userCredentials: { email, password, displayName },
  } = action;

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);

    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* onSignUp() {
  yield takeLatest(SIGN_UP_START, signUp);
}

function* signInAfterSignUp(action) {
  const { user, additionalData } = action;
  yield getSnapshotFromUserAuth(user, additionalData);
}

function* onSignUpSuccess() {
  yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}

// USER SESSION
function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

// SIGN OUT
function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUp),
    call(onSignUpSuccess),
  ]);
}
