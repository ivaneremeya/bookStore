import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BookModal } from "../../../../pages/books/lib/BookModal";
import { BtnCart } from "../btn-cart/BtnCart";
import styles from "./header.module.scss";

export const style = {
  position: "absolute",
  border: "none",
  top: "51%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "auto",
  p: 4,
};

export const HeaderNav = () => {
  const [vizible, setVizible] = React.useState(false);
  const handleVizible = () => setVizible(true);
  const handleCloseVizible = () => setVizible(false);
  const { t } = useTranslation(["common"]);

  return (
    <nav className={styles.header__nav}>
      <Link to="/cart">
        <BtnCart />
      </Link>

      <Link className={styles.button__header} to="/AutorListPage">
        {t("common:headerAutor")}
      </Link>

      <Link className={styles.button__header} to="/BooksList?page=1">
        {t("common:headerBooks")}
      </Link>

      <button
        type="button"
        className={styles.button__header}
        onClick={handleVizible}
      >
        {t("common:headerCreatBook")}
      </button>

      <Modal open={vizible} onClose={handleCloseVizible}>
        <Box sx={style}>
          <BookModal onClose={handleCloseVizible} />
        </Box>
      </Modal>
    </nav>
  );
};
