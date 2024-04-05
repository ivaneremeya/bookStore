import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const AlertOrderSlice = createSlice({
  name: "alertOrder",
  initialState,
  reducers: {
    setAlertOrder(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setAlertOrder } = AlertOrderSlice.actions;
export default AlertOrderSlice.reducer;
