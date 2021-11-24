import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserType {
  email: string;
  displayName: string | null;
  createdAt: string;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  id?: string;
}

export interface UserState {
  currentUser: UserType | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserType | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
