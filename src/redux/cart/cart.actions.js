import { TOGGLE_CART_DISPLAY, ADD_ITEM, REMOVE_ITEM } from './cart.types';

export const toggleCartDisplay = () => ({
  type: TOGGLE_CART_DISPLAY,
});

export const addItem = item => ({
  type: ADD_ITEM,
  item,
});

export const removeItem = itemId => ({
  type: REMOVE_ITEM,
  itemId,
});
