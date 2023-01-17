import { AuthState, JWTPayload } from "./state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { facebookLoginThunk, googleLoginThunk, loginThunk } from "./thunk";

const initialState: AuthState = {
  loading: false,
  isAuth: false,
  user: undefined,
  message: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadTokenReducer: (state, action: PayloadAction<{ token: string }>) => {
      try {
        const payload: JWTPayload = jwt_decode(action.payload.token);
        state.user = payload;
        state.isAuth = true;
        state.message = undefined;
      } catch (error) {
        state.user = undefined;
        state.message = "invalid JWT Token";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
      state.user = undefined;
      state.message = undefined;
    });
    builder.addCase(facebookLoginThunk.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
      state.user = undefined;
      state.message = undefined;
    });
    builder.addCase(googleLoginThunk.pending, (state) => {
      state.loading = true;
      state.isAuth = false;
      state.user = undefined;
      state.message = undefined;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      const payload: JWTPayload = jwt_decode(action.payload.token);
      state.user = payload;
      state.isAuth = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", payload.id.toString());
      localStorage.setItem("username", payload.username);
      state.message = undefined;
    });
    builder.addCase(facebookLoginThunk.fulfilled, (state, action) => {
      state.loading = false;
      const payload: JWTPayload = jwt_decode(action.payload.token);
      state.user = payload;
      state.isAuth = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", payload.id.toString());
      localStorage.setItem("username", payload.username);
      state.message = undefined;
    });
    builder.addCase(googleLoginThunk.fulfilled, (state, action) => {
      state.loading = false;
      const payload: JWTPayload = jwt_decode(action.payload.token);
      state.user = payload;
      state.isAuth = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", payload.id.toString());
      localStorage.setItem("username", payload.username);
      state.message = undefined;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.loading = false;
      state.user = undefined;
      state.isAuth = false;
      state.message = "invalid JWT Token";
    });
    builder.addCase(facebookLoginThunk.rejected, (state) => {
      state.loading = false;
      state.isAuth = false;
      state.user = undefined;

      state.message = "invalid JWT Token";
    });
    builder.addCase(googleLoginThunk.rejected, (state) => {
      state.loading = false;
      state.isAuth = false;
      state.user = undefined;

      state.message = "invalid JWT Token";
    });
  },
});

export const { loadTokenReducer } = authSlice.actions;

export const authReducer = authSlice.reducer;
