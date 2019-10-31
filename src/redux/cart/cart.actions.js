import {
  TOGGLE_CART_DISPLAY,
  HIDE_CART,
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_ITEM,
} from './cart.types';

export const toggleCartDisplay = () => ({
  type: TOGGLE_CART_DISPLAY,
});

export const hideCart = () => ({
  type: HIDE_CART,
});

export const addItem = item => ({
  type: ADD_ITEM,
  item,
});

// decrease item qty by 1
export const removeItem = itemId => ({
  type: REMOVE_ITEM,
  itemId,
});

// clear item from cart
export const clearItem = itemId => ({
  type: CLEAR_ITEM,
  itemId,
});
