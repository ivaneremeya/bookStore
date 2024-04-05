import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostCart } from "../../../entities/book-card/books-card/api/CartApi";
import { AxiosInstance } from "../../../shared/api/auth";
import { setAlertType } from "../../../shared/ui/alert/AlertSlice";

export const fetchUpdateCart = createAsyncThunk(
  "cart/fetchPatch",
  async (
    date: { book_id: number; amount: number; errorMessage: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await AxiosInstance.patch("/api/cart/update_cart/", {
        cart: [{ book_id: date.book_id, amount: date.amount }],
      });
      const data = response.data[0];
      if (date.amount === 0) {
        return { book_id: date.book_id, amount: date.amount };
      }
      return data;
    } catch (error: any) {
      dispatch(
        setAlertType({
          title: "error",
          descr: date.errorMessage,
          isVizible: true,
        }),
      );
      return rejectWithValue(error);
    }
  },
);
