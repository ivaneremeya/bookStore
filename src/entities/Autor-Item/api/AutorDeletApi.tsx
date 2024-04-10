import { createAsyncThunk } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { AxiosInstance } from "../../../shared/api/auth";
import { setAlertType } from "../../../shared/ui/alert/AlertSlice";
import { fetchAutors } from "../../../pages/autor/model/AutorListSlice";

export const AutorDeletApi = createAsyncThunk(
  "autorDelet/DeletAutor",
  async (id: number, thunkApi) => {
    const { t } = useTranslation(["error"]);

    try {
      await AxiosInstance.delete(`/api/authors/${id}/`);
      thunkApi.dispatch(fetchAutors());
    } catch (error) {
      thunkApi.dispatch(
        setAlertType({
          title: "error",
          descr: t("error:autorDelet"),
          isVizible: true,
        }),
      );
    }
  },
);
