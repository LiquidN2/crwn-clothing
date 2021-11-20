import { combineReducers } from '@reduxjs/toolkit';
import { userReducer, UserState } from './user/user.reducer';
import { cartReducer, CartState } from './cart/cart.reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export interface StoreState {
  user: UserState;
  cart: CartState;
}

export const rootReducer = combineReducers<StoreState>({
  user: userReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
