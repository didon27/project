import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ar: () => require('../../Translations/ar.json'),
  en: () => require('../../Translations/en.json'),
  fr: () => require('../../Translations/fr.json'),
  af: () => require('../../Translations/af.json'),
  sq: () => require('../../Translations/sq.json'),
  az: () => require('../../Translations/az.json'),
  bn: () => require('../../Translations/bn.json'),
  bg: () => require('../../Translations/bg.json'),
  zh: () => require('../../Translations/zh_CN.json'),
  cs: () => require('../../Translations/cs.json'),
  da: () => require('../../Translations/da.json'),
  nl: () => require('../../Translations/nl_NL.json'),
  et: () => require('../../Translations/et.json'),
  fi: () => require('../../Translations/fi.json'),
  ka: () => require('../../Translations/ka_GE.json'),
  de: () => require('../../Translations/de.json'),
  el: () => require('../../Translations/el.json'),
  ha: () => require('../../Translations/ha.json'),
  he: () => require('../../Translations/he.json'),
  hi: () => require('../../Translations/hi_IN.json'),
  hu: () => require('../../Translations/hu.json'),
  id: () => require('../../Translations/id.json'),
  it: () => require('../../Translations/it.json'),
  ja: () => require('../../Translations/ja.json'),
  ko: () => require('../../Translations/ko.json'),
  fa: () => require('../../Translations/fa.json'),
  pt: () => require('../../Translations/pt.json'),
  sl: () => require('../../Translations/sl.json'),
  so: () => require('../../Translations/so.json'),
  es: () => require('../../Translations/es.json'),
  sw: () => require('../../Translations/sw.json'),
  sv: () => require('../../Translations/sv.json'),
  tr: () => require('../../Translations/tr.json'),
};

export const IMLocalized = memoize(
  (key, config) =>
    i18n.t(key, config).includes('missing') ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false };

  // const { languageTag, isRTL } =
  //   RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
  //   fallback;
  let localeLanguageTag = Localization.locale.split('-')[0];
  let isRTL = Localization.isRTL;

  // if (localeLanguageTag) {
  //   localeLanguageTag = 'en';
  //   isRTL = false;
  // }

  // i18n.fallbacks = true;

  // clear translation cache
  IMLocalized.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {
    [localeLanguageTag]: translationGetters[localeLanguageTag](),
  };
  i18n.locale = localeLanguageTag;
};
