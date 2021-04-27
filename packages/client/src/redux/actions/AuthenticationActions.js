import { AxiosInstance } from '../../config/axios';
import {
  signIn,
  signInSuccess,
  signInFailure,
  getCurrent,
  getCurrentSuccess,
  getCurrentFailure,
  signOut
} from '../reducers/AuthenticationReducer';

export const signInAction = credentials => {
  return async dispatch => {
    dispatch(signIn());
    try {
      // request to authenticate the user
      const response = await AxiosInstance.post('authentication/signin', credentials);

      // save the token
      localStorage.setItem('accessToken', response.data.data);
      dispatch(signInSuccess(response.data.data));
    } catch (error) {
      localStorage.setItem('accessToken', null);
      dispatch(signInFailure(error.response.data.error));
    }
  };
};

export const signUpAction = values => {
  return async dispatch => {
    dispatch(signIn());
    try {
      // request to authenticate the user
      const response = await AxiosInstance.post('authentication/signup', values);

      // save the token
      localStorage.setItem('accessToken', response.data.data);
      dispatch(signInSuccess(response.data.data));
    } catch (error) {
      localStorage.removeItem('accessToken');
      dispatch(signInFailure(error.response.data.error));
    }
  };
};

export const getCurrentUserAction = () => {
  return async dispatch => {
    dispatch(getCurrent());
    try {
      // send the request
      const response = await AxiosInstance.get('user/me');

      // save the data of the user
      dispatch(getCurrentSuccess(response.data.data));
    } catch (error) {
      localStorage.removeItem('accessToken');
      dispatch(getCurrentFailure(error.response.data.error));
    }
  };
};

export const signOutAction = () => {
  return async dispatch => {
    localStorage.removeItem('accessToken');
    dispatch(signOut());
  };
};
