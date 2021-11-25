import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ShopItem } from '../../models/ShopItem';
import {
  addItemToCart,
  changeItemQuantityInCart,
  removeItemFromCart,
} from './cart.utils';

export interface CartItem extends ShopItem {
  quantity: number;
  total: number;
}

export interface CartState {
  hidden: boolean;
  cartItems: CartItem[];
}

const initialState: CartState = {
  hidden: true,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartHidden: state => {
      state.hidden = !state.hidden;
    },

    addItem: (state, action: PayloadAction<ShopItem>) => {
      state.cartItems = addItemToCart(action.payload, state.cartItems);
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.cartItems = removeItemFromCart(action.payload, state.cartItems);
    },

    changeItemQuantity: (
      state,
      action: PayloadAction<{ itemId: number; changeQtyBy: number }>
    ) => {
      state.cartItems = changeItemQuantityInCart(
        action.payload.itemId,
        state.cartItems,
        action.payload.changeQtyBy
      );
    },
  },
});

export const { toggleCartHidden, addItem, removeItem, changeItemQuantity } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
