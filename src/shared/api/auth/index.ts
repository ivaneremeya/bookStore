import axios from "axios";
import Cookies from "js-cookie";
import { setAlertType } from "../../ui/alert/AlertSlice";

const pathsRequireAuth = [
  "api/books/",
  "api/authors/",
  "api/cart/make_order/",
  "api/cart/update_cart/",
  "api/genres/",
  "api/orders/",
  "api/orders/pay/",
  "api/token/",
  "api/token/refresh/",
];

export interface Token {
  refresh: string;
  access: string;
}
export interface User {
  id?: number;
  email: string;
  password: string;
  is_superuser?: boolean;
  is_staff?: boolean;
  is_active?: boolean;
  date_joined?: string;
  last_login?: string;
}
export const AxiosInstance = axios.create({
  baseURL: "/",
  withCredentials: true,
});
export const AvailableEmail = async (email: string): Promise<boolean> =>
  (
    await AxiosInstance.get<{ is_available: boolean }>("api/users/available", {
      params: { email },
    })
  ).data.is_available;
export const onSubmitOther = async (data: {
  email: string;
  password: string;
  dispatch: any;
}) => {
  try {
    const response = await axios.post("api/users/", {
      email: data.email,
      password: data.password,
    });
    data.dispatch(
      setAlertType({
        title: "success",
        descr: "success created user",
        isVizible: true,
      }),
    );
  } catch (error: any) {
    console.error("Login error:", error);
    data.dispatch(
      setAlertType({
        title: "error",
        descr: error.message,
        isVizible: true,
      }),
    );
  }
};
export const onSubmitLogin = (data: {
  email: string;
  password: string;
  dispatch: any;
}) => {
  AxiosInstance.post("api/token/", {
    email: data.email,
    password: data.password,
  })
    .then(async (res) => {
      localStorage.setItem("access", res.data.access);
      Cookies.set("refresh", res.data.refresh);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error.message);
      console.error("Login error:", error);
      data.dispatch(
        setAlertType({
          title: "error",
          descr: error.message,
          isVizible: true,
        }),
      );
    });
};
export const refreshToken = async (): Promise<string> => {
  const refresh = Cookies.get("refresh");
  const { access } = (
    await AxiosInstance.post<Token>("api/token/refresh/", { refresh })
  ).data;
  localStorage.setItem("access", access);
  return access;
};
export const verifyToken = async (): Promise<string> => {
  if (!localStorage.getItem("access")) {
    return "";
  }
  return AxiosInstance.post("api/token/verify/", {
    token: localStorage.getItem("access"),
  }).then(async (res) => {
    if (!res.data) {
      return refreshToken();
    }
    return localStorage.getItem("access") as string;
  });
};
AxiosInstance.interceptors.request.use(async (config) => {
  if (
    (config.headers && pathsRequireAuth.includes(config.url!)) ||
    config.method === "get" ||
    config.method === "patch" ||
    config.method === "delete" ||
    config.method === "post"
  ) {
    config.headers.Authorization = localStorage.getItem("access")
      ? `Bearer ${localStorage.getItem("access")}`
      : "";
  }

  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (error.response.config.url === "api/token/") {
        return Promise.reject(error);
      }
      return refreshToken();
    }
    return Promise.reject(error);
  },
);
