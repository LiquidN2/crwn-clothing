import { takeLatest, put, all, call } from 'redux-saga/effects';

import { SIGN_OUT_SUCCESS } from 'redux/user/user.types';

import { clearCart } from './cart.actions';

function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* onSignOutSuccess() {
  yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
