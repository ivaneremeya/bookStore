import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../../../app/store/hook";
import { CartItem } from "../../../../entities/cartItem/CartItem";
import { CartItemProps } from "../../../../entities/book-card/books-card/api/CartApi";
import "./Cart.scss";
import { MakeOrderCart } from "../makeOrder/MakeOrderCart";

const CartList = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation(["cartPage"]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
  };
  const carts: CartItemProps[] = useAppSelector((state) => state.cart.item);
  const totalPrice: number = useAppSelector((state) => state.cart.totalPrice);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{t("cartPage:cartPageTitle")}</h1>
      <div className="shopping-cart">
        <div className="column-labels">
          <span style={{ textAlign: "center" }} className="product-image">
            {t("cartPage:cartPageImage")}
          </span>
          <span className="product-details">
            {t("cartPage:cartPageProduct")}
          </span>
          <span className="stok-product"> {t("cartPage:cartPageStock")} </span>
          <span className="product-quantity">
            {t("cartPage:cartPageQuantity")}
          </span>
          <span className="product-removal">
            {t("cartPage:cartPageRemove")}
          </span>
        </div>

        {carts.map((cart) => (
          <CartItem key={cart.id} id={cart.book_id} amount={cart.amount} />
        ))}
        <div className="totals">
          <div className="totals-item totals-item-total">
            <span> {t("cartPage:cartPagePrice")}</span>
            <div className="totals-value" id="cart-total">
              {totalPrice}
            </div>
          </div>
        </div>
        <button type="button" className="checkout" onClick={handleOpen}>
          {t("cartPage:cartPageCheckout")}
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <MakeOrderCart />
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default CartList;
