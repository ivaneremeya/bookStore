import React from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputFormModal } from "../../shared/ui/input/InputFormModal";
import styles from "./auth.module.scss";
import styl from "../../widgets/header/ui/btn-cart/btnCart.module.scss";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: SubmitHandler<LoginForm>;
  title: string;
  descr: string;
}

export const FormAuth: React.FC<LoginFormProps> = ({
  onSubmit,
  title,
  descr,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation(["authModal"]);

  const submitHandler: SubmitHandler<FieldValues> = (data: FieldValues) => {
    onSubmit(data as LoginForm);
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
      onSubmit={handleSubmit(submitHandler)}
    >
      <h3 className={styles.title}>{title}</h3>
      <InputFormModal
        error={errors.email}
        regist={register("email", { required: true })}
        placehol={t("authModal:authEmail")}
        type="email"
      />
      <InputFormModal
        error={errors.password}
        regist={register("password", { required: true })}
        placehol={t("authModal:authPassword")}
        type="password"
      />
      <button
        className={styl.button__cart}
        style={{ backgroundColor: "#1976d2", justifyContent: "center" }}
        type="submit"
      >
        {descr}
      </button>
    </form>
  );
};
