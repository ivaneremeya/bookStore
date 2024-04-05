import React, { Suspense } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./app/routers/Router";
import { store } from "./app/store/store";
import "./app/global.scss";
import "./i18n";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Не найден контейнер приложения!");
}

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
