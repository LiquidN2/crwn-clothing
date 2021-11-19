import { ActionType } from './cart.actionType';
import type { ShopItem } from '../../models/ShopItem';
import type { CartItem } from './cart.reducer';

// -------------------------
// Action Typing
interface ToggleCartHiddenAction {
  type: ActionType.TOGGLE_CART_HIDDEN;
}

interface AddItemAction {
  type: ActionType.ADD_ITEM;
  payload: ShopItem;
}

interface RemoveItemAction {
  type: ActionType.REMOVE_ITEM;
  payload: CartItem['id'];
}

interface ChangeItemQuantityAction {
  type: ActionType.CHANGE_ITEM_QUANTITY;
  payload: { itemId: CartItem['id']; changeQtyBy: number };
}

export type CartActions =
  | ToggleCartHiddenAction
  | AddItemAction
  | RemoveItemAction
  | ChangeItemQuantityAction;

// --------------------------
// Action creators
export const toggleCartHidden = (): ToggleCartHiddenAction => ({
  type: ActionType.TOGGLE_CART_HIDDEN,
});

export const addItem = (item: ShopItem): AddItemAction => ({
  type: ActionType.ADD_ITEM,
  payload: item,
});

export const removeItem = (itemId: CartItem['id']): RemoveItemAction => ({
  type: ActionType.REMOVE_ITEM,
  payload: itemId,
});

export const changeItemQuantity = (
  itemId: CartItem['id'],
  changeQtyBy: number
): ChangeItemQuantityAction => ({
  type: ActionType.CHANGE_ITEM_QUANTITY,
  payload: { itemId, changeQtyBy },
});
