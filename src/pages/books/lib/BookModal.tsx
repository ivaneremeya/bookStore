import React, { useEffect } from "react";
import axios from "axios";
import { useForm, SubmitHandler, Path } from "react-hook-form";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/store/hook";
import { setBookCreat } from "../model/reducer/slice/BookListSlice";
import { Autor, Genreses, Book } from "../ui/TypeBooks";
import { InputFormModal } from "../../../shared/ui/input/InputFormModal";
import FormSelect from "../../../shared/ui/select/SelectComponent";
import { fetchAutors } from "../../autor/model/AutorListSlice";
import { fetchGenreses } from "../model/reducer/slice/GenriesSlice";
import styl from "../../../widgets/header/ui/btn-cart/btnCart.module.scss";

interface ModalFormProps {
  onClose: () => void;
}

export const BookModal: React.FC<ModalFormProps> = ({ onClose }) => {
  const autors: Autor[] = useAppSelector((state) => state.autorList.autors);
  const genres: Genreses[] = useAppSelector((state) => state.genreses.genreses);
  const { t } = useTranslation(["bookModal"]);

  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<Book>({ mode: "onChange" });

  useEffect(() => {
    dispatch(fetchAutors());
    dispatch(fetchGenreses());
  }, [dispatch]);

  const optionsAutors = autors.map((option) => ({
    value: option.id,
    label: option.first_name,
  }));
  const optionsGenres = genres.map((option) => ({
    value: option.id,
    label: option.title,
  }));

  const onSubmit: SubmitHandler<Book> = (formData) => {
    axios
      .post("/api/books/", formData)
      .then((value) => {
        onClose();
        dispatch(setBookCreat([value.data]));
      })
      .catch(() => {
        onClose();
      });
    onClose();
  };
  console.log(t("bookModal:bookModalGenres"));

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("id", { value: Date.now() })} />
        <InputFormModal
          error={errors.in_stock}
          regist={register("in_stock", {
            required: true,
            min: 3,
          })}
          placehol={t("bookModal:bookModalStok")}
          type="number"
        />
        <InputFormModal
          error={errors.title}
          regist={register("title", { required: true, minLength: 4 })}
          placehol={t("bookModal:bookModalTitle")}
          type="text"
        />
        <InputFormModal
          error={errors.description}
          regist={register("description", { required: true, minLength: 4 })}
          placehol={t("bookModal:bookModalDescr")}
          type="text"
        />
        <InputFormModal
          error={errors.price}
          regist={register("price", { required: true, pattern: /^[0-3]*$/ })}
          placehol={t("bookModal:bookModalPrice")}
          type="number"
        />
        <FormSelect
          // @ts-expect-error - name тип еще не объявлен
          name={t("bookModal:bookModalGenres")}
          control={control}
          options={optionsGenres}
          error={!!errors.genres}
          errorMessage="Please select at least one author"
          onChange={(selected: any) => {
            setValue("genres", selected, { shouldValidate: true });
          }}
        />
        <FormSelect
          // @ts-expect-error - name тип еще не объявлен
          name={t("bookModal:bookModalAuthor")}
          control={control}
          options={optionsAutors}
          error={!!errors.author}
          errorMessage="Please select at least one author"
          onChange={(selected: any) => {
            setValue("author", selected, { shouldValidate: true });
          }}
        />
        <InputFormModal
          error={errors.release_date}
          regist={register("release_date", { required: true })}
          placehol={t("bookModal:bookModalRelease")}
          type="date"
        />
        <InputFormModal
          error={errors.writing_date}
          regist={register("writing_date", { required: true })}
          placehol={t("bookModal:bookModalWriting")}
          type="date"
        />
        <button
          className={styl.button__cart}
          style={{ backgroundColor: "#1976d2", justifyContent: "center" }}
          type="submit"
        >
          {t("bookModal:bookModalCreat")}
        </button>
      </form>
    </Box>
  );
};
