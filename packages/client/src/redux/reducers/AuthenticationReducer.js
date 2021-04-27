import { createSlice } from '@reduxjs/toolkit';

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: {},
    accessToken: '',
    isLogged: false,
    status: 'initial',
    error: null
  },
  reducers: {
    signIn: state => {
      state.status = 'idle';
      state.isLogged = false;
      state.accessToken = '';
      state.error = null;
    },
    signInSuccess: (state, { payload }) => {
      state.status = 'resolved';
      state.isLogged = true;
      state.accessToken = payload;
      state.error = null;
    },
    signInFailure: (state, { payload }) => {
      state.status = 'rejected';
      state.isLogged = false;
      state.accessToken = '';
      state.error = payload;
    }
  }
});

export const { signIn, signInSuccess, signInFailure } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
