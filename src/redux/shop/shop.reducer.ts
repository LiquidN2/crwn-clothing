import { ActionType } from './shop.actionType';
import { ShopAction } from './shop.actions';
import { ShopCollection } from '../../models/Collection';

export interface ShopData {
  [key: string]: ShopCollection;
}

export type CollectionRouteName = keyof ShopData;

export interface ShopState {
  collections: ShopData;
  isLoading: boolean;
  error: any;
}

const INITIAL_STATE: ShopState = {
  collections: {},
  isLoading: false,
  error: null,
};

export const shopReducer = (
  state: ShopState = INITIAL_STATE,
  action: ShopAction
): ShopState => {
  switch (action.type) {
    case ActionType.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case ActionType.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        collections: action.payload,
      };

    case ActionType.FETCH_COLLECTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
