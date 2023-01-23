import { ActivityState, JWTPayload } from "./state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { homeActivityThunk } from "./thunk";

const initialState: ActivityState = {
  loading: true,
  activity: undefined,
  message: undefined,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(homeActivityThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(homeActivityThunk.fulfilled, (state, action) => {
      state.activity = action.payload;
      state.loading = false;
    });
  },
});

export const homeReducer = homeSlice.reducer;
