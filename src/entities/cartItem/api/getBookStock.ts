import { AxiosInstance } from "../../../shared/api/auth";

export const GetStockBook = async (id: number) => {
  const response = await AxiosInstance.get(`/api/books/${id}/`);
  return response.data;
};
