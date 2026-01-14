import { configureStore, createSlice } from '@reduxjs/toolkit';


// Auth slice to manage isLoggedIn state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

// User slice to store user details
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: null,
  },
  reducers: {
    setUser(state, action) {
      state.userDetails = action.payload;
    },
    clearUser(state) {
      state.userDetails = null;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;
export const { setUser, clearUser } = userSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
