import { ActionType } from './cart.actionType';
import { CartActions } from './cart.actions';

export interface CartState {
  hidden: boolean;
}

const INITIAL_STATE = {
  hidden: true,
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

    default:
      return state;
  }
};
