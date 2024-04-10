import { configureStore } from "@reduxjs/toolkit";
import BookListSlice from "../../pages/books/model/reducer/slice/BookListSlice";
import AutorListSlice from "../../pages/autor/model/AutorListSlice";
import OpenModalSlice from "../../pages/books/model/reducer/slice/OpenModalSlice";
import GenriesSlice from "../../pages/books/model/reducer/slice/GenriesSlice";
import AlertSlice from "../../shared/ui/alert/AlertSlice";
import AuthFormSlace from "../../pages/books/model/reducer/slice/AuthFormSlace";
import CartListSlice from "../../pages/cart/model/slice-reducer/CartListSlice";
import ZipcodeSlice from "../../pages/cart/ui/makeOrder/model/zipcodeSlice";
import AlertOrderSlice from "../../pages/cart/ui/makeOrder/model/AlertOrderSlice";
import authSlice from "../../widgets/header/ui/header/model/authSlice";

export const store = configureStore({
  reducer: {
    alertOrder: AlertOrderSlice,
    zipcodeError: ZipcodeSlice,
    bookList: BookListSlice,
    autorList: AutorListSlice,
    modalOpen: OpenModalSlice,
    genreses: GenriesSlice,
    alert: AlertSlice,
    auth: AuthFormSlace,
    cart: CartListSlice,
    AuthModal: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
