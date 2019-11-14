import {
  TOGGLE_CART_DISPLAY,
  HIDE_CART,
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_ITEM,
  CLEAR_CART,
} from './cart.types';

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from './cart.utils';

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
      return {
        ...state,
        items: removeItemFromCart(state.items, action.itemId),
      };

    case CLEAR_ITEM:
      return {
        ...state,
        items: clearItemFromCart(state.items, action.itemId),
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
