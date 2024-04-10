import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const authSlice = createSlice({
  name: "AuthModal",
  initialState,
  reducers: {
    setAuthVizible: (state, action) => action.payload,
  },
});

export const { setAuthVizible } = authSlice.actions;
export default authSlice.reducer;
