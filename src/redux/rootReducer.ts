import { combineReducers } from '@reduxjs/toolkit';
import { userReducer, UserState } from './user/user.reducer';

export interface StoreState {
  user: UserState;
}

const rootReducer = combineReducers<StoreState>({
  user: userReducer,
});

export default rootReducer;
