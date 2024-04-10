import React, { Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Books } from "../../pages/books/index";
import { Loader } from "../../shared/ui/Loader/Loader";
import { MainPage } from "../../pages/main/ui/MainPage";

const BooksList = React.lazy(() => import("../../pages/books/ui/BooksList"));
const AutorsListPage = React.lazy(
  () => import("../../pages/autor/ui/AutorListPage"),
);
const Home = React.lazy(() => import("../../pages/home/Home"));
const CartList = React.lazy(
  () => import("../../pages/cart/ui/cartList/CartList"),
);

type CustomRouteObject = RouteObject & {
  guard?: (navigateTo: (to: string) => void) => boolean;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
    children: [
      {
        index: true,
        element: localStorage.getItem("access") ? (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ) : (
          <MainPage />
        ),
      },
      {
        path: "AutorListPage",
        element: localStorage.getItem("access") ? (
          <Suspense fallback={<Loader />}>
            <AutorsListPage />
          </Suspense>
        ) : (
          <MainPage />
        ),
      },
      {
        path: "BooksList",
        element: localStorage.getItem("access") ? (
          <Suspense fallback={<Loader />}>
            <BooksList />
          </Suspense>
        ) : (
          <MainPage />
        ),
      },
      {
        path: "cart",
        element: localStorage.getItem("access") ? (
          <Suspense fallback={<Loader />}>
            <CartList />
          </Suspense>
        ) : (
          <MainPage />
        ),
      },
    ],
    guard: () => !!localStorage.getItem("access"),
  } as CustomRouteObject,
]);

export default router;
