import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { resources } from "./app/locales/resources";

const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: savedLanguage,
    resources,
    debug: true,
    detection: {
      order: ["queryString", "cookie"],
      caches: ["cookie"],
    },
    defaultNS: "common",
    ns: ["common", "authModal"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
