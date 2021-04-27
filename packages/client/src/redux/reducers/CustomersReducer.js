import { createSlice } from '@reduxjs/toolkit';

export const CustomersSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    selected: null,
    status: 'initial',
    error: null
  },
  reducers: {
    getCustomers: state => {
      state.customers = [];
      state.status = 'idle';
      state.error = null;
    },
    getCustomersSuccess: (state, { payload }) => {
      state.customers = [...payload];
      state.status = 'resolved';
      state.error = null;
    },
    getCustomersFailure: (state, { payload }) => {
      state.customers = [];
      state.status = 'rejected';
      state.error = payload;
    }
  }
});

export const { getCustomers, getCustomersSuccess, getCustomersFailure } = CustomersSlice.actions;

export default CustomersSlice.reducer;
