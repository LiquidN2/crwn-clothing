import { ActionType } from './shop.actionType';
import { ShopData } from './shop.data';

interface UpdateCollectionsAction {
  type: ActionType.UPDATE_COLLECTIONS;
  payload: ShopData;
}

export type ShopAction = UpdateCollectionsAction;

export const updateCollections = (
  collections: ShopData
): UpdateCollectionsAction => ({
  type: ActionType.UPDATE_COLLECTIONS,
  payload: collections,
});
