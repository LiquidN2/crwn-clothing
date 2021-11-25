import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ShopCollection } from '../../models/Collection';
import { ShopData } from './shop.slice';
import memoize from 'lodash.memoize';

const selectShop = (state: RootState) => state.shop;

export const selectCollectionsLoading = createSelector(
  [selectShop],
  (shop): boolean => shop.isLoading
);

export const selectCollectionsError = createSelector(
  [selectShop],
  shop => shop.error
);

export const selectCollections = createSelector(
  [selectShop],
  (shop): ShopData => shop.collections
);

export const selectCollectionsAsArray = createSelector(
  [selectCollections],
  (collections): ShopCollection[] =>
    collections ? Object.values(collections) : []
);

export const selectCollection = memoize((collectionRouteName: keyof ShopData) =>
  createSelector([selectCollections], (collections): ShopCollection | null =>
    collections ? collections[collectionRouteName] : null
  )
);
