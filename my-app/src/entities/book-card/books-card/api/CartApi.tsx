import { createAsyncThunk } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { redirect } from "react-router-dom";
import { setAlertType } from "../../../../shared/ui/alert/AlertSlice";
import { AxiosInstance } from "../../../../shared/api/auth";

export interface PostCart {
  book_id: number;
  amount: number;
}

export interface CartItemProps extends PostCart {
  city: string;
  address: string;
  zipcode: string;
  id: number;
  state: string;
  user_id: number;
  warranty_days: number;
  new_price: number;
  orders_id: string;
  orders_time: string | Date;
}

export interface CartList {
  persons_discounted_price: number;
  products: Array<CartItemProps>;
  total: number;
}
export interface CartAddress {
  city: string;
  address: string;
  zipcode: string;
}

export interface Order {
  order_id: string;
  total: number;
  persons_discounted_price: number;
  products: Array<CartItemProps>;
  status: string;
}

export const makeOrder = createAsyncThunk(
  "order/makeOrder",
  async (
    data: {
      city: string;
      address: string;
      zipcode: string;
      errorMessage: string;
    },
    thunkApi,
  ) => {
    try {
      const response = await AxiosInstance.post("api/cart/make_order/", {
        city: data.city,
        address: data.address,
        zipcode: data.zipcode,
      });
      thunkApi.dispatch(
        setAlertType({
          title: "success",
          descr: data.errorMessage,
          isVizible: true,
        }),
      );
      setTimeout(() => {
        redirect("/BooksList");
      }, 1500);
      return response.data as Order;
    } catch (error) {
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
