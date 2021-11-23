import { SHOP_DATA, ShopData } from './shop.data';
import { ActionType } from './shop.actionType';
import { ShopAction } from './shop.actions';

export interface ShopState {
  collections: ShopData;
}

const INITIAL_STATE: ShopState = {
  collections: SHOP_DATA,
};

export const shopReducer = (
  state: ShopState = INITIAL_STATE,
  action: ShopAction
): ShopState => {
  switch (action.type) {
    case ActionType.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };

    default:
      return state;
  }
};
