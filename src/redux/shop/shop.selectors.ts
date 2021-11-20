import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectShop = (state: RootState) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);
