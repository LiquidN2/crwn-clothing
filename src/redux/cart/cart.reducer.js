import {
  TOGGLE_CART_DISPLAY,
  HIDE_CART,
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_ITEM,
} from './cart.types';

import { addItemToCart, clearItemFromCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  items: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CART_DISPLAY:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case HIDE_CART:
      return {
        ...state,
        hidden: true,
      };

    case ADD_ITEM:
      return {
        ...state,
        items: addItemToCart(state.items, action.item),
      };

    case REMOVE_ITEM:
      return { ...state };

    case CLEAR_ITEM:
      return {
        ...state,
        items: clearItemFromCart(state.items, action.itemId),
      };

    default:
      return state;
  }
};

export default cartReducer;
