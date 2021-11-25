import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopCollection } from '../../models/Collection';
import { getCollections } from '../../firebase/firebase.firestore';

export interface ShopData {
  [key: string]: ShopCollection;
}

export type CollectionRouteName = keyof ShopData;

export interface ShopState {
  collections: ShopData;
  isLoading: boolean;
  error: string | undefined;
}

export const fetchCollectionsAsync = createAsyncThunk(
  'shop/fetchCollections',
  async () => {
    try {
      return await getCollections();
    } catch (err) {
      throw err;
    }
  }
);

const initialState: ShopState = {
  collections: {},
  isLoading: false,
  error: undefined,
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCollectionsAsync.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchCollectionsAsync.fulfilled,
        (state, action: PayloadAction<ShopData>) => {
          state.isLoading = false;
          state.error = undefined;
          state.collections = action.payload;
        }
      )
      .addCase(fetchCollectionsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const shopReducer = shopSlice.reducer;
