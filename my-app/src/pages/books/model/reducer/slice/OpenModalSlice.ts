import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const OpenModalSlice = createSlice({
  name: "modalOpen",
  initialState,
  reducers: {
    setOpens(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setOpens } = OpenModalSlice.actions;
export default OpenModalSlice.reducer;
