import { TOGGLE_CART_DISPLAY, ADD_ITEM, REMOVE_ITEM } from './cart.types';
import { addItemToCart } from './cart.utils';

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

    case ADD_ITEM:
      return {
        ...state,
        items: addItemToCart(state.items, action.item),
      };

    case REMOVE_ITEM:
      return { ...state };

    default:
      return state;
  }
};

export default cartReducer;
