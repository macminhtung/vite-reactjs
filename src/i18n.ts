import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { LanguageEnum, LanguageKeyEnum } from 'languages';
import { EN, VI } from 'languages';
import type { i18n as i18nType } from 'i18next';

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

export const useTrans = (): {
  t: (key: LanguageKeyEnum) => string;
  i18n: i18nType;
} => useTranslation();

export default i18n;
