/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/api/userApi';
import StorageKey from '~/constants/storage-keys';

export const register = createAsyncThunk('users/register', async (payload) => {
  //call api to register users
  const data = await userApi.register(payload);
  // save data to local storage
  localStorage.setItem(StorageKey.TOKEN, data.jwt);
  localStorage.setItem(StorageKey.USER, JSON.stringify(data.user));
  //return user data
  return data.user;
});
export const login = createAsyncThunk('users/login', async (payload) => {
  //call api to register users
  const data = await userApi.login(payload);
  // save data to local storage
  localStorage.setItem('access_token', data.jwt);
  localStorage.setItem('user', JSON.stringify(data.user));
  //return user data
  return data.user;
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKey.USER)) || {},
    setting: {},
  },

  reducers: {
    logout(state) {
      //clear local storage
      localStorage.removeItem(StorageKey.USER);
      localStorage.removeItem(StorageKey.TOKEN);
      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});
const { actions, reducer } = userSlice;
export const { increase, decrease, logout } = actions; // namde export
export default reducer; // default export
