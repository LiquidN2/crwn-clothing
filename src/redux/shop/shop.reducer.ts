import SHOP_DATA, { ShopCollection } from './shop.data';

export interface ShopState {
  collections: ShopCollection[];
}

const INITIAL_STATE: ShopState = {
  collections: SHOP_DATA,
};

export const shopReducer = (
  state: ShopState = INITIAL_STATE,
  action: any
): ShopState => {
  switch (action.type) {
    default:
      return state;
  }
};
