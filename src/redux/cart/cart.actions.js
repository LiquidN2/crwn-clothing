import { TOGGLE_CART_DISPLAY, ADD_ITEM } from './cart.types';

export const toggleCartDisplay = () => ({
  type: TOGGLE_CART_DISPLAY,
});

export const addItem = item => ({
  type: ADD_ITEM,
  item,
});
