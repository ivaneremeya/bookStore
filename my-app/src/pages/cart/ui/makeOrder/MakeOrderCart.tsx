import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import "./MakeOrderCart.scss";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hook";
import { validateZipcode } from "../../api/ValidZipcodeCart";
import {
  makeOrder,
  CartAddress,
} from "../../../../entities/book-card/books-card/api/CartApi";

export const MakeOrderCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const zipcodeError: string = useAppSelector((state) => state.zipcodeError);
  const { t } = useTranslation(["makeOrderModal", "error"]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const errorMessage = t("error:makeOrder");
    dispatch(
      makeOrder({ ...data, errorMessage } as CartAddress & {
        errorMessage: string;
      }),
    );
    reset();
  };

  const handleZipcodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const zipcode = e.target.value;
    if (zipcode) {
      await validateZipcode(Number(zipcode), dispatch);
    }
  };

  return (
    <div className="cart-order">
      <div className="cart__wrapper">
        <div className="cart__container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1> {t("makeOrderModal:makeOrderModalDetail")}</h1>
            <div className="name">
              <div>
                <label htmlFor="city">
                  {t("makeOrderModal:makeOrderModalCity")}
                  <input
                    id="city"
                    type="text"
                    {...register("city", { required: true, minLength: 1 })}
                  />
                </label>
                {errors.city && (
                  <span style={{ color: "red" }} role="alert">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="address">
                  {t("makeOrderModal:makeOrderModalAdress")}

                  <input
                    id="address"
                    type="text"
                    {...register("address", { required: true, minLength: 1 })}
                  />
                </label>
                {errors.address && (
                  <span style={{ color: "red" }} role="alert">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="zipcode">
                {t("makeOrderModal:makeOrderModalZicope")}
                <input
                  id="zipcode"
                  type="text"
                  {...register("zipcode", {
                    required: true,
                    minLength: 1,
                    onBlur: handleZipcodeBlur,
                  })}
                />
              </label>
              {errors.zipcode && (
                <span style={{ color: "red" }} role="alert">
                  This field is required
                </span>
              )}
              {zipcodeError && (
                <span style={{ color: "red" }} role="alert">
                  {zipcodeError}
                </span>
              )}
            </div>
            <div className="btns">
              <button type="submit">
                {t("makeOrderModal:makeOrderModalMaking")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
