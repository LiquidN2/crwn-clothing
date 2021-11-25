import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { auth, signInWithGoogle, signUp } from '../../firebase/firebase.auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { UserType, AuthStatusType, UserState } from './user.tsTyping';

export const signInWithGoogleAsync = createAsyncThunk(
  'user/signInWithGoogleAsync',
  async () => {
    try {
      return await signInWithGoogle();
    } catch (err) {
      throw err;
    }
  }
);

export const signInAsync = createAsyncThunk(
  'user/signInAsync',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      throw err;
    }
  }
);

export const signOutAsync = createAsyncThunk('user/signOutAsync', async () => {
  try {
    return await signOut(auth);
  } catch (err) {
    throw err;
  }
});

export const signUpAsync = createAsyncThunk(
  'user/signUpAsync',
  async ({
    email,
    password,
    displayName,
  }: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    try {
      return await signUp({ email, password, displayName });
    } catch (err) {
      throw err;
    }
  }
);

const initialState: UserState = {
  currentUser: null,
  status: AuthStatusType.Unauthenticated,
  error: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserType | null>) => {
      state.currentUser = action.payload;
      state.status = action.payload
        ? AuthStatusType.Authenticated
        : AuthStatusType.Unauthenticated;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInWithGoogleAsync.pending, state => {
        state.status = AuthStatusType.Authenticating;
        state.error = undefined;
      })
      .addCase(signInWithGoogleAsync.fulfilled, state => {
        state.status = AuthStatusType.Authenticated;
        state.error = undefined;
      })
      .addCase(signInWithGoogleAsync.rejected, (state, action) => {
        state.status = AuthStatusType.Unauthenticated;
        state.error = action.error.message;
      })
      .addCase(signInAsync.pending, state => {
        state.status = AuthStatusType.Authenticating;
        state.error = undefined;
      })
      .addCase(signInAsync.fulfilled, state => {
        state.status = AuthStatusType.Authenticated;
        state.error = undefined;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.status = AuthStatusType.Unauthenticated;
        state.error = action.error.message;
      })
      .addCase(signOutAsync.pending, state => {
        state.status = AuthStatusType.SigningOut;
        state.error = undefined;
      })
      .addCase(signOutAsync.fulfilled, state => {
        state.status = AuthStatusType.SignOutSuccess;
        state.error = undefined;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.status = AuthStatusType.SignOutError;
        state.error = action.error.message;
      })
      .addCase(signUpAsync.pending, state => {
        state.status = AuthStatusType.SigningUp;
        state.error = undefined;
      })
      .addCase(signUpAsync.fulfilled, state => {
        state.status = AuthStatusType.SignUpSuccess;
        state.error = undefined;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = AuthStatusType.SignUpError;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
