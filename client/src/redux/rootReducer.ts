import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import { userReducer, UserState } from './user';
import { cartReducer, CartState } from './cart';
import { directoryReducer, DirectoryState } from './directory';
import { shopReducer, ShopState } from './shop';

export interface StoreState {
  user: UserState;
  cart: CartState;
  directory: DirectoryState;
  shop: ShopState;
}

export const rootReducer = combineReducers<StoreState>({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
