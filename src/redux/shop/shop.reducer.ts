import { ActionType } from './shop.actionType';
import { ShopAction } from './shop.actions';
import { ShopCollection } from '../../models/Collection';

export interface ShopData {
  [key: string]: ShopCollection;
}

export type CollectionRouteName = keyof ShopData;

export interface ShopState {
  collections: ShopData;
}

const INITIAL_STATE: ShopState = {
  collections: {},
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
