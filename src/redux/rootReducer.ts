import { combineReducers } from '@reduxjs/toolkit';
import { userReducer, UserState } from './user/user.reducer';
import { cartReducer, CartState } from './cart/cart.reducer';

export interface StoreState {
  user: UserState;
  cart: CartState;
}

const rootReducer = combineReducers<StoreState>({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
