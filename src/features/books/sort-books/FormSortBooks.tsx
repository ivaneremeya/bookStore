import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../app/store/hook";
import { InputFormModal } from "../../../shared/ui/input/InputFormModal";
import { fetchFilterBooks } from "../../../pages/books/api/ApiBooks";
import styl from "../../../widgets/header/ui/btn-cart/btnCart.module.scss";

export interface FormSort {
  title: string;
  price: number;
}

export const FormSortBooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["bookPage", "error"]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const submitHandler: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const errorMessage = t("error:filterBooksError");
    dispatch(
      fetchFilterBooks({ ...data, errorMessage } as FormSort & {
        errorMessage: string;
      }),
    );
    navigate(`?title=${data.title}&price=${data.price}`);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <InputFormModal
        error={errors.title}
        regist={register("title", { required: true, minLength: 2 })}
        placehol={t("bookPage:title")}
        type="text"
      />
      <InputFormModal
        error={errors.price}
        regist={register("price", { required: true, minLength: 2 })}
        placehol={t("bookPage:price")}
        type="number"
      />
      <div>
        <button
          className={styl.button__cart}
          type="submit"
          style={{ marginTop: "7px" }}
        >
          {t("bookPage:search")}
        </button>
      </div>
    </form>
  );
};
