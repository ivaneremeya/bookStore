import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../ui/TypeBooks";
import { AxiosInstance } from "../../../shared/api/auth";
import { setAlertType } from "../../../shared/ui/alert/AlertSlice";

export const fetchBooks = createAsyncThunk<
  Book[],
  { errorMessage?: string },
  { rejectValue: string }
>(
  "bookList/fetchByIdStatus",
  async ({ errorMessage = "An error occurred" }, thunkApi) => {
    try {
      const response = await axios.get("api/books/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      return response.data.result;
    } catch (error: any) {
      thunkApi.dispatch(
        setAlertType({
          title: "error",
          descr: errorMessage,
          isVizible: true,
        }),
      );
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchFilterBooks = createAsyncThunk(
  "bookList/fetchFilterBooksStatus",
  async (
    data: { title: string; price: number; errorMessage: string },
    thunkApi,
  ) => {
    try {
      const response = await AxiosInstance.get("api/books/", {
        params: { title: data.title, price: data.price },
      });
      return response.data.result;
    } catch (error: unknown) {
      thunkApi.dispatch(
        setAlertType({
          title: "error",
          descr: data.errorMessage,
          isVizible: true,
        }),
      );
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fethPaginationBooks = createAsyncThunk(
  "bookList/fetchPaginationBooksStatus",
  async (
    data: { page: number; page_size: number; errorMsg: string },
    thunkApi,
  ) => {
    try {
      const response = await AxiosInstance.get("api/books/", {
        params: { page: data.page, page_size: data.page_size },
      });
      return response.data.result;
    } catch (error: any) {
      thunkApi.dispatch(
        setAlertType({
          title: "error",
          descr: data.errorMsg,
          isVizible: true,
        }),
      );
      return thunkApi.rejectWithValue(error);
    }
  },
);
