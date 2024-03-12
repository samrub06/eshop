import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface userInfoState {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Define a type for the slice state
interface AuthState {
  userInfo: userInfoState | null;
}

const initialState: AuthState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<userInfoState | null>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action: PayloadAction<void>) => {
      state.userInfo = null;
      localStorage.clear();
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
