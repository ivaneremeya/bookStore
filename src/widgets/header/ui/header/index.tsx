import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import { HeaderNav, style } from "./HeaderNav";
import styl from "../btn-cart/btnCart.module.scss";
import { ModalAuth } from "../../../../features/auth/ui/ModalAuth";

import styles from "./header.module.scss";
import { NavMobile } from "../../../../shared/ui/burger-menu/NavMobile";
import { ButtonLanguage } from "../../../../shared/ui/button-language/ButtonLanguage";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hook";
import { setAuthVizible } from "./model/authSlice";

export const Header = () => {
  const open = useAppSelector((state) => state.AuthModal);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["common"]);

  const handleOpen = () => dispatch(setAuthVizible(true));
  const handleClose = () => dispatch(setAuthVizible(false));

  const updateMount = () => {
    localStorage.removeItem("access");
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <svg
          fill="#000000"
          width="50px"
          height="30px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>book</title>
          <path d="M15 25.875v-19.625c0 0-2.688-2.25-6.5-2.25s-6.5 2-6.5 2v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938zM29 25.875v-19.625c0 0-2.688-2.25-6.5-2.25s-6.5 2-6.5 2v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938zM31 8h-1v19h-12v1h-5v-1h-12v-19h-1v20h12v1h-7.062l-0.062-1h-12v-20z" />
        </svg>
      </Link>
      <HeaderNav />
      {localStorage.getItem("access") ? (
        <button
          type="button"
          className={styl.button__cart}
          onClick={updateMount}
        >
          {t("common:authExit")}
        </button>
      ) : (
        <button
          type="button"
          className={styl.button__cart}
          onClick={handleOpen}
        >
          {t("common:authEntrance")}
        </button>
      )}
      <ButtonLanguage />

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ModalAuth />
        </Box>
      </Modal>
      <NavMobile />
    </header>
  );
};
