import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TranslationEN } from "./locales/EN";
import { TranslationRU } from "./locales/RU";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: TranslationEN,
      },
      ru: {
        translation: TranslationRU,
      },
    },
  });

i18n.languages = ["en", "ru"];

export default i18n;
