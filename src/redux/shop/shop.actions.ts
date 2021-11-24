import { Dispatch } from 'redux';
import { ActionType } from './shop.actionType';
import { ShopData } from './shop.reducer';
import { getCollections } from '../../firebase/firebase.firestore';

interface FetchCollectionsStartAction {
  type: ActionType.FETCH_COLLECTIONS_START;
}

interface FetchCollectionsErrorAction {
  type: ActionType.FETCH_COLLECTIONS_ERROR;
  payload: any;
}

interface FetchCollectionsSuccessAction {
  type: ActionType.FETCH_COLLECTIONS_SUCCESS;
  payload: ShopData;
}

export type ShopAction =
  | FetchCollectionsStartAction
  | FetchCollectionsSuccessAction
  | FetchCollectionsErrorAction;

export const fetchCollections =
  () => async (dispatch: Dispatch<ShopAction>) => {
    dispatch({ type: ActionType.FETCH_COLLECTIONS_START });

    try {
      const collections = await getCollections();
      dispatch({
        type: ActionType.FETCH_COLLECTIONS_SUCCESS,
        payload: collections,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_COLLECTIONS_ERROR,
        payload: err,
      });
    }
  };
