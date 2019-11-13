import {
  SET_CURRENT_USER,
  GOOGLE_SIGN_IN_START,
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAILURE,
  EMAIL_SIGN_IN_START,
  EMAIL_SIGN_IN_SUCCESS,
  EMAIL_SIGN_IN_FAILURE,
} from './user.types';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  currentUser: user,
});

export const googleSignInStart = () => ({
  type: GOOGLE_SIGN_IN_START,
});

export const googleSignInSuccess = user => ({
  type: GOOGLE_SIGN_IN_SUCCESS,
  user,
});

export const googleSignInFailure = error => ({
  type: GOOGLE_SIGN_IN_FAILURE,
  error,
});

export const emailSignInStart = emailAndPassword => ({
  type: EMAIL_SIGN_IN_START,
  emailAndPassword,
});

export const emailSignInSuccess = user => ({
  type: EMAIL_SIGN_IN_SUCCESS,
  user,
});

export const emailSignInFailure = error => ({
  type: EMAIL_SIGN_IN_FAILURE,
  error,
});
