import { createSelector } from 'reselect';

// const COLLECTION_ID_MAP = new Map([
//   ['hats', 1],
//   ['sneakers', 2],
//   ['jackets', 3],
//   ['womens', 4],
//   ['mens', 5],
// ]);

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
  return createSelector(
    [selectShopCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );
};
