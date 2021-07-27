import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TranslationEN } from "./locales/EN";
import { TranslationRU } from "./locales/RU";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    lng: "en",
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
