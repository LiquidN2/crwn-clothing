import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// export const selectShopCollection = collectionUrlParam =>
//   createSelector(
//     [selectShopCollections],
//     collections =>
//       collections.find(
//         collection =>
//           collection.id === COLLECTION_ID_MAP.get(collectionUrlParam)
//       )
//   );

// export const selectShopCollection = collectionUrlParam => {
//   return createSelector(
//     [selectShopCollections],
//     collections =>
//       collections.find(
//         collection => collection.routeName === collectionUrlParam
//       )
//   );
// };

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  collections =>
    collections ? Object.entries(collections).map(([key, value]) => value) : []
);

export const selectShopCollection = collectionUrlParam => {
  return createSelector([selectShopCollections], collections =>
    collections ? collections[collectionUrlParam] : null
  );
};

export const selectIsCollectionsFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);

export const selectCollectionsFetchingErrorMessage = createSelector(
  [selectShop],
  shop => shop.errorMessage
);
