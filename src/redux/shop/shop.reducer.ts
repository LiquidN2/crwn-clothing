import { SHOP_DATA, ShopData } from './shop.data';

export interface ShopState {
  collections: ShopData;
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
