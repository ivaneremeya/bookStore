import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../../shared/api/auth";
import { setAlertType } from "../../../shared/ui/alert/AlertSlice";

export const fetchGetListCart = createAsyncThunk(
  "cart/fetchCartList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const respons = (await AxiosInstance.get("/api/cart/")).data;
      return respons;
    } catch (error: any) {
      dispatch(
        setAlertType({
          title: "error",
          descr: "This is  Cart List an error Alert",
          isVizible: true,
        }),
      );
      return rejectWithValue(error);
    }
  },
);
