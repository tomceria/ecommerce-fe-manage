import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "../assets/lang/en.lang";
import vi from "../assets/lang/vi.lang";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en,
      vi
    }
  });
export default i18n;
