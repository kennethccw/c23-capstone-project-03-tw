import { createAsyncThunk } from "@reduxjs/toolkit";
import { getHomeActivities } from "../../api/homeAPI";

export const homeActivityThunk = createAsyncThunk("@home/activity", async () => {
  const data = await getHomeActivities();
  return data;
});
