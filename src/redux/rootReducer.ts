import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { userReducer, UserState } from './user/user.slice';
import { cartReducer, CartState } from './cart/cart.slice';
import { directoryReducer, DirectoryState } from './directory/directory.slice';
import { shopReducer, ShopState } from './shop/shop.slice';

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
