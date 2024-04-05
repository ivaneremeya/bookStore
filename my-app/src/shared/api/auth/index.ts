import axios from "axios";
import Cookies from "js-cookie";

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
}) => {
  try {
    const response = await axios.post("api/users/", data);
    console.log(response);
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
  }
  // await AvailableEmail(data.email);
};
export const onSubmitLogin = (data: { email: string; password: string }) => {
  AxiosInstance.post("api/token/", data).then(async (res) => {
    localStorage.setItem("access", res.data.access);
    Cookies.set("refresh", res.data.refresh);
    window.location.reload();
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
      return refreshToken();
    }
    return Promise.reject(error);
  },
);
