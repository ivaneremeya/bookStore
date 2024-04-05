import { createSlice } from "@reduxjs/toolkit";
import { CartItemProps } from "../../../../entities/book-card/books-card/api/CartApi";
import { fetchGetListCart } from "../../api/fetchGetListCart";
import { fetchUpdateCart } from "../../api/fetchUpdateCart";

const initialState: { totalPrice: number; item: CartItemProps[] } = {
  totalPrice: 0,
  item: [],
};

const CartListSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addApiCartList(state, action) {
      state.item = action.payload.products;
      state.totalPrice = action.payload.total;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpdateCart.fulfilled, (state, action) => {
      const { book_id, amount } = action.payload;
      const cartItem = state.item.find((item) => item.book_id === book_id);
      if (cartItem) {
        cartItem.amount = amount;
        if (amount === 0) {
          state.item = state.item.filter((item) => item.book_id !== book_id);
        }
      } else {
        state.item.push(action.payload);
      }

      state.totalPrice = state.item.reduce(
        (sum, obj) => sum + obj.new_price * obj.amount,
        0,
      );
    });
    builder.addCase(fetchGetListCart.pending, (state) => {
      if (!state.item.length) {
        state.totalPrice = 0;
      }
    });
    builder.addCase(fetchGetListCart.fulfilled, (state, action) => {
      state.item = action.payload.products;
      state.totalPrice = action.payload.total;
    });
  },
});

export const { addApiCartList } = CartListSlice.actions;
export default CartListSlice.reducer;
