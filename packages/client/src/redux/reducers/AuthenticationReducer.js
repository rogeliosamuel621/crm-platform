import { createSlice } from '@reduxjs/toolkit';

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: {},
    accessToken: localStorage.getItem('accessToken') || '',
    isLogged: true,
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
    },
    getCurrent: state => {
      state.status = 'idle';
      // state.isLogged = true;
      state.user = null;
      state.error = null;
    },
    getCurrentSuccess: (state, { payload }) => {
      state.status = 'resolved';
      // state.isLogged = true;
      state.user = payload;
    },
    getCurrentFailure: (state, { payload }) => {
      state.status = 'rejected';
      state.isLogged = false;
      state.accessToken = '';
      state.user = null;
      state.error = null;
    },
    signOut: state => {
      state.status = 'initial';
      state.isLogged = false;
      state.accessToken = '';
      state.user = null;
      state.error = null;
    }
  }
});

export const {
  signIn,
  signInSuccess,
  signInFailure,
  getCurrent,
  getCurrentSuccess,
  getCurrentFailure,
  signOut
} = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
