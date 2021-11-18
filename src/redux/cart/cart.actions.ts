import { ActionType } from './cart.actionType';

interface ToggleCartHiddenAction {
  type: ActionType.TOGGLE_CART_HIDDEN;
}

export type CartActions = ToggleCartHiddenAction;

export const toggleCartHidden = (): ToggleCartHiddenAction => ({
  type: ActionType.TOGGLE_CART_HIDDEN,
});
