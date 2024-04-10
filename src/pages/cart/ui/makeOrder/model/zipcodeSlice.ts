import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const ZipcodeSlice = createSlice({
  name: "zipcodeError",
  initialState,
  reducers: {
    setZipcodeError(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setZipcodeError } = ZipcodeSlice.actions;
export default ZipcodeSlice.reducer;
