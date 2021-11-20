import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CollectionIdMap, CollectionRouteName } from './shop.data';
import memoize from 'lodash.memoize';

const selectShop = (state: RootState) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollection = memoize(
  (collectionRouteName: CollectionRouteName) =>
    createSelector([selectCollections], collections =>
      collections.find(
        collection => collection.id === CollectionIdMap[collectionRouteName]
      )
    )
);
