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

export const fetchCollections = createAsyncThunk(
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
      .addCase(fetchCollections.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        fetchCollections.fulfilled,
        (state, action: PayloadAction<ShopData>) => {
          state.isLoading = false;
          state.error = undefined;
          state.collections = action.payload;
        }
      )
      .addCase(fetchCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const shopReducer = shopSlice.reducer;
