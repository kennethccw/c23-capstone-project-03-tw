import { AuthState, JWTPayload } from "./state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { facebookLoginThunk, googleLoginThunk, loginThunk, validateTokenThunk } from "./thunk";

const initialState: AuthState = {
  isAuth: false,
  user: undefined,
  message: undefined,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    validateTokenReducer: (state, action: PayloadAction<{ token: string }>) => {
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
    });
    builder.addCase(validateTokenThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(facebookLoginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(googleLoginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const payload: JWTPayload = jwt_decode(action.payload.token);
      state.user = payload;
      state.isAuth = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", payload.id.toString());
      localStorage.setItem("username", payload.username);
      state.message = undefined;
      state.loading = false;
    });
    builder.addCase(validateTokenThunk.fulfilled, (state, action) => {
      const payload: JWTPayload = jwt_decode(action.payload.token);
      state.user = payload;
      state.isAuth = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", payload.id.toString());
      localStorage.setItem("username", payload.username);
      state.message = undefined;
      state.loading = false;
    });
    builder.addCase(facebookLoginThunk.fulfilled, (state, action) => {
      const payload: JWTPayload = jwt_decode(action.payload.token);
      state.user = payload;
      state.isAuth = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", payload.id.toString());
      localStorage.setItem("username", payload.username);
      state.loading = false;
    });
    builder.addCase(googleLoginThunk.fulfilled, (state, action) => {
      const payload: JWTPayload = jwt_decode(action.payload.token);
      state.user = payload;
      state.isAuth = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", payload.id.toString());
      localStorage.setItem("username", payload.username);
      state.loading = false;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.loading = false;
      state.user = undefined;
      state.isAuth = false;
      state.message = "invalid JWT Token";
    });
    builder.addCase(validateTokenThunk.rejected, (state) => {
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

export const { validateTokenReducer } = authSlice.actions;

export const authReducer = authSlice.reducer;
