import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguageEnum } from 'common/enum';
import { EN, VI } from 'languages';

export const LANGUAGE_KEY = 'LANGUAGE_KEY';
export const LANGUAGE_VALUES = Object.values(LanguageEnum);
export const DEFAULT_LANGUAGE =
  LANGUAGE_VALUES.find((item) => item === localStorage.getItem(LANGUAGE_KEY)) || LanguageEnum.EN;

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  fallbackLng: LanguageEnum.EN,
  interpolation: {
    escapeValue: false,
  },
  debug: false,
  resources: {
    [LanguageEnum.EN]: {
      translation: EN,
    },
    [LanguageEnum.VI]: {
      translation: VI,
    },
  },
});

export default i18n;
