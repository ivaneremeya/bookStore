import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../../widgets/header/ui/header/header.module.scss";

export const ButtonLanguage = () => {
  const { i18n } = useTranslation(["common"]);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };
  return (
    <div className={styles.langvich__wrapper}>
      <button
        className={styles.langvich__button}
        type="button"
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
      <button
        className={styles.langvich__button}
        type="button"
        onClick={() => changeLanguage("ru")}
      >
        RU
      </button>
    </div>
  );
};
