import { ActionType } from './cart.actionType';
import type { ShopItem } from '../../models/ShopItem';
import { CartActions } from './cart.actions';
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

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

export const cartReducer = (
  state: CartState = INITIAL_STATE,
  action: CartActions
): CartState => {
  switch (action.type) {
    case ActionType.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case ActionType.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(action.payload, state.cartItems),
      };

    case ActionType.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(action.payload, state.cartItems),
      };

    case ActionType.CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: changeItemQuantityInCart(
          action.payload.itemId,
          state.cartItems,
          action.payload.changeQtyBy
        ),
      };

    default:
      return state;
  }
};
