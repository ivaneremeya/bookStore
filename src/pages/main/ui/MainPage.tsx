import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../app/store/hook";
import { setAuthVizible } from "../../../widgets/header/ui/header/model/authSlice";
import styles from "./main.module.scss";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const handleVizible = () => dispatch(setAuthVizible(true));

  const { t } = useTranslation(["main"]);
  return (
    <div className={styles.main__wrapper}>
      <h2 className={styles.main__title}>{t("main:title")}</h2>
      <button
        className={styles.main__button}
        onClick={handleVizible}
        type="button"
      >
        {t("main:Enter")}
      </button>
    </div>
  );
};
