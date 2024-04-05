import React from "react";
import InputLabel from "@mui/material/InputLabel";
import { Merge, FieldErrorsImpl, FieldError } from "react-hook-form";
import styles from "./input.module.scss";

interface IProps {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  regist: any;
  placehol: string;
  type: string;
}
export const InputFormModal = ({ error, regist, placehol, type }: IProps) => {
  const inputStyle = {
    border: error ? "1px solid red" : "1px solid #ccc",
    height: "43px",
    lineHeight: "35px",
  };
  return (
    <div style={{ height: "120px" }}>
      <InputLabel id="demo-multiple-checkbox-label">{placehol}</InputLabel>
      <input
        className={styles.input__form__modal}
        id={placehol}
        type={type}
        aria-invalid={error ? "true" : "false"}
        {...regist}
        style={{ ...inputStyle }}
        placeholder={placehol}
      />
      {error && (
        <span style={{ color: "red" }} role="alert">
          This field is required
        </span>
      )}
    </div>
  );
};
