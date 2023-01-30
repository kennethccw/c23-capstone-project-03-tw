import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdoptionState } from "./state";

const initialState: AdoptionState = {
  fullName: "",
  email: "",
  mobile: "",
  remark: "",
};

const adoptionSlice = createSlice({
  name: "adoption",
  initialState,
  reducers: {
    adoptionApplicationReducer: (state, action: PayloadAction<AdoptionState>) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.remark = action.payload.remark;
    },
  },
});
export const { adoptionApplicationReducer } = adoptionSlice.actions;

export const adoptionReducer = adoptionSlice.reducer;
