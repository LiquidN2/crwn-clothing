import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectUserStatus = createSelector(
  [selectUser],
  user => user.status
);
