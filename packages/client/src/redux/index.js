import { configureStore } from '@reduxjs/toolkit';

// reducers
import AuthenticationReducer from './reducers/AuthenticationReducer';
import CustomersReducer from './reducers/CustomersReducer';

export const store = configureStore({
  reducer: {
    authentication: AuthenticationReducer,
    customers: CustomersReducer
  }
});
