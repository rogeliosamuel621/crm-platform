import { AxiosInstance } from '../../config/axios';
import {
  getCustomers,
  getCustomersFailure,
  getCustomersSuccess
} from '../reducers/CustomersReducer';

export const getCustomersAction = () => {
  return async dispatch => {
    dispatch(getCustomers());
    try {
      // get all of the customers of the user
      const { data } = await AxiosInstance.get('customer/');

      dispatch(getCustomersSuccess(data.data));
    } catch (error) {
      dispatch(getCustomersFailure(error.response.data.error));
    }
  };
};
