import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserBasicInfo } from '@types';
import userApi from 'services/userApi';
import { LoginFormValues } from './components/LoginForm';
import { RegisterFormValues } from './components/RegisterForm';

export interface UserState {
  current: UserBasicInfo | null;
}

const initialState: UserState = {
  current: null,
};

export const register = createAsyncThunk('user/register', async (params: RegisterFormValues) => {
  await userApi.register(params);
});

export const login = createAsyncThunk('user/login', async (params: LoginFormValues) => {
  await userApi.login(params);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getMe(state) {
      state.current = userApi.getMe();
    },
  },
  extraReducers: {
    [register.fulfilled.type]: (state) => {
      return state;
    },

    [login.fulfilled.type]: (state) => {
      return state;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;

export const { getMe } = actions;
export default userReducer;
