import { configureStore } from '@reduxjs/toolkit';

// reducers
import AuthenticationReducer from './reducers/AuthenticationReducer';

export const store = configureStore({
  reducer: {
    authentication: AuthenticationReducer
  }
});
