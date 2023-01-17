import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, UserLoginInfo, facebookLogin, googleLogin, validateToken } from "../../api/authAPI";

export const loginThunk = createAsyncThunk("@auth/login", async (user: UserLoginInfo, _thunkAPI) => {
  const data = await login(user);
  return data;
});
export const validateTokenThunk = createAsyncThunk("@auth/validation", async (token: string | null, _thunkAPI) => {
  const data = await validateToken(token);
  return data;
});

export const facebookLoginThunk = createAsyncThunk("@auth/login/facebook", async (code: string) => {
  const data = await facebookLogin(code);
  return data;
});
export const googleLoginThunk = createAsyncThunk("@auth/login/google", async () => {
  const data = await googleLogin();
  return data;
});
