import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../app/store/hook";
import { fetchGetListCart } from "../../../../pages/cart/api/fetchGetListCart";
import { fetchUpdateCart } from "../../../../pages/cart/api/fetchUpdateCart";
import { CartItemProps } from "../api/CartApi";
import { useDebounce } from "../../../../features/cart/utils/UseDebounce";
import styl from "../../../../widgets/header/ui/btn-cart/btnCart.module.scss";

interface CartUpdateButtonProps {
  bookId: number;
  carts: CartItemProps[];
}

export const CartUpdateButton: React.FC<CartUpdateButtonProps> = ({
  bookId,
  carts,
}) => {
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["bookCard", "error"]);

  const sendUpdateRequest = useCallback(
    async (newAmount: number) => {
      const cartAmount = carts.find((val) => val.book_id === bookId);
      try {
        if (cartAmount) {
          await dispatch(
            fetchUpdateCart({
              book_id: bookId,
              amount: cartAmount.amount + newAmount,
              errorMessage: t("error:cartPatchError"),
            }),
          ).unwrap();
        } else {
          await dispatch(
            fetchUpdateCart({
              book_id: bookId,
              amount: newAmount,
              errorMessage: t("error:cartPatchError"),
            }),
          ).unwrap();
        }
        await dispatch(fetchGetListCart()).unwrap();
      } catch (error) {
        console.error("Ошибка при обновлении корзины:", error);
      }
      setButtonPressCount(0);
    },
    [dispatch, bookId, carts],
  );

  const debouncedOnPatchCart = useDebounce((newAmount: number) => {
    sendUpdateRequest(newAmount);
  }, 300);

  const onButtonClick = () => {
    setButtonPressCount((prevCount) => prevCount + 1);
    debouncedOnPatchCart(buttonPressCount + 1);
  };

  return (
    <button className={styl.button__cart} type="button" onClick={onButtonClick}>
      {t("bookCard:purchase")}
    </button>
  );
};
