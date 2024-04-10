import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../app/store/hook";
import { fetchUpdateCart } from "../../pages/cart/api/fetchUpdateCart";
import { useDebounce } from "../../features/cart/utils/UseDebounce";
import logo from "../../app/img/book-2-svgrepo-com.svg";
import { GetStockBook } from "./api/getBookStock";

interface CartItemProps {
  id: number;
  amount: number;
}

export const CartItem: React.FC<CartItemProps> = ({ id, amount }) => {
  const [displayCount, setDisplayCount] = React.useState<string>(
    String(amount),
  );
  const [count, setCount] = React.useState<number>(amount);
  const [stock, setStock] = React.useState<number>(0);
  const { t } = useTranslation(["cartPage", "error"]);

  const dispatch = useAppDispatch();
  const debouncedFetchCart = useDebounce((newAmount: number) => {
    dispatch(
      fetchUpdateCart({
        book_id: id,
        amount: newAmount,
        errorMessage: t("error:cartPatchError"),
      }),
    );
  }, 300);

  React.useEffect(() => {
    const fetchStock = async () => {
      const inStock = await GetStockBook(id);
      setStock(inStock.in_stock);
    };

    fetchStock();
  }, [id]);
  console.log(stock, "stockBook");

  const onPatchCart = (newAmount: number) => {
    if (stock >= newAmount) {
      setCount(newAmount);
      setDisplayCount(String(newAmount));
      debouncedFetchCart(newAmount);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    let numericValue = Number(value);

    if (!Number.isNaN(numericValue)) {
      numericValue = numericValue > stock ? stock : numericValue;

      setDisplayCount(String(numericValue));
      setCount(numericValue);
      if (numericValue > 0) {
        debouncedFetchCart(numericValue);
      }
    } else if (value === "") {
      setDisplayCount("");
      setCount(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "+" || e.key === "," || e.key === ".") {
      e.preventDefault();
    }
  };

  const isDecreaseDisabled = Number(displayCount) <= 1;
  return (
    <div className="product">
      <div className="product-image">
        <img src={logo} alt="Logo" />
      </div>
      <div className="product-details">
        <div className="product-title">Samuel Rios</div>
      </div>
      <div className="product-removal">
        <p className="stok-product">{stock}</p>
      </div>
      <div className="product-quantity">
        <button
          type="button"
          onClick={() => onPatchCart(count - 1)}
          disabled={isDecreaseDisabled}
          className="qt-minus"
        >
          -
        </button>
        <input
          type="number"
          value={displayCount}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="qt"
          max={stock}
        />
        <button
          type="button"
          onClick={() => onPatchCart(count + 1)}
          className="qt-plus"
        >
          +
        </button>
      </div>
      <div className="product-removal">
        <button
          type="button"
          onClick={() =>
            dispatch(
              fetchUpdateCart({
                book_id: id,
                amount: 0,
                errorMessage: t("error:cartPatchError"),
              }),
            )
          }
          className="remove-product"
        >
          {t("cartPage:cartPageRemove")}
        </button>
      </div>
    </div>
  );
};
