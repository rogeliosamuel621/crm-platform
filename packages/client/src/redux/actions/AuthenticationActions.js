import { AxiosInstance } from '../../config/axios';
import { signIn, signInFailure, signInSuccess } from '../reducers/AuthenticationReducer';

export const signInAction = credentials => {
  return async dispatch => {
    dispatch(signIn());
    try {
      // request to authenticate the user
      const response = await AxiosInstance.post('authentication/signin', credentials);

      // save the token
      dispatch(signInSuccess(response.data.data));
    } catch (error) {
      dispatch(signInFailure(error.response.data.error));
    }
  };
};
