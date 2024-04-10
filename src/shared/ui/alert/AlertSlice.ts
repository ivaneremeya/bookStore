import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertSliceTape {
  title: "success" | "error" | "warning" | "info";
  descr: string;
  isVizible: boolean;
}

const initialState: AlertSliceTape = {
  title: "success",
  descr: "",
  isVizible: false,
};

const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertVizible: (state, action) => {
      state.isVizible = action.payload;
    },
    setAlertType: (state, action: PayloadAction<AlertSliceTape>) => {
      state.title = action.payload.title;
      state.descr = action.payload.descr;
      state.isVizible = action.payload.isVizible;
    },
  },
});

export const { setAlertType, setAlertVizible } = AlertSlice.actions;
export default AlertSlice.reducer;
