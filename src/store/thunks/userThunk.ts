/** @format */

import {
  getSelfHelper,
  loginFailure,
  loginStart,
  loginSucess,
} from '../slices/userSlice';
import { AppDispatch } from '../store';

import { axiosInstance, axiosAuthInstance } from '../../config';

export const login = async (
  dispatch: AppDispatch,
  user: { email: string; password: string }
) => {
  dispatch(loginStart());
  try {
    const res = await axiosAuthInstance.post(`/login`, {
      email: user.email,
      password: user.password,
    });
    dispatch(loginSucess({ user: res.data.user, token: res.data.token }));

    return res;
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const signup = async (
  dispatch: AppDispatch,
  user: { email: string; password: string; username: string }
) => {
  dispatch(loginStart());
  try {
    const res = await axiosAuthInstance.post(`/signup`, {
      username: user.username,
      email: user.email,
      password: user.password,
    });
    dispatch(loginSucess({ user: res.data.user, token: res.data.token }));
    return res;
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getUserDetails = async (dispatch: AppDispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.get(`/getSelf`);
    dispatch(getSelfHelper({ user: res.data.userDetails }));
    return res;
  } catch (error) {
    dispatch(loginFailure());
  }
};
