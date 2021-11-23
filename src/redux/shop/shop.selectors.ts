import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ShopCollection } from '../../models/Collection';
import { ShopData } from './shop.data';
import memoize from 'lodash.memoize';

const selectShop = (state: RootState) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop): ShopData => shop.collections
);

export const selectCollectionsAsArray = createSelector(
  [selectCollections],
  (collections): ShopCollection[] => Object.values(collections)
);

export const selectCollection = memoize((collectionRouteName: keyof ShopData) =>
  createSelector(
    [selectCollections],
    (collections): ShopCollection => collections[collectionRouteName]
  )
);
