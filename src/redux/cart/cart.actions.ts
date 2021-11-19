import { ActionType } from './cart.actionType';
import type { ShopItem } from '../../models/ShopItem';

interface ToggleCartHiddenAction {
  type: ActionType.TOGGLE_CART_HIDDEN;
}

interface AddItemAction {
  type: ActionType.ADD_ITEM;
  payload: ShopItem;
}

export type CartActions = ToggleCartHiddenAction | AddItemAction;

export const toggleCartHidden = (): ToggleCartHiddenAction => ({
  type: ActionType.TOGGLE_CART_HIDDEN,
});

export const addItem = (item: ShopItem): AddItemAction => ({
  type: ActionType.ADD_ITEM,
  payload: item,
});
