// Internationalization (i18n) Module
// Languages: English (en), Bahasa Malaysia (my)

import { translations as en } from './en.js';
import { translations as myBase } from './my.js';

const translations = {
  en,
  my: {}
};

function mergeFallback(enObj, myObj, target) {
  const allKeys = new Set([...Object.keys(enObj), ...Object.keys(myObj)]);
  for (const key of allKeys) {
    const enVal = enObj[key];
    const myVal = myObj[key];

    if (typeof enVal === 'object' && !Array.isArray(enVal) && enVal !== null &&
        typeof myVal === 'object' && !Array.isArray(myVal) && myVal !== null) {
      target[key] = {};
      mergeFallback(enVal, myVal, target[key]);
    } else if (myVal !== undefined) {
      target[key] = myVal;
    } else {
      target[key] = enVal;
    }
  }
}

mergeFallback(en, myBase, translations.my);

export { translations };

let currentLang = localStorage.getItem('lang') || 'my';

export function getLanguage() {
  return currentLang;
}

export function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
}

export function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'my' : 'en');
  return currentLang;
}

export function initI18n() {
  setLanguage(currentLang);
  return currentLang;
}

export function t(keyPath, lang = currentLang) {
  const keys = keyPath.split('.');
  let value = translations[lang];
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else if (lang !== 'en') {
      value = translations.en;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation missing: ${keyPath}`);
          return keyPath;
        }
      }
    } else {
      console.warn(`Translation missing: ${keyPath}`);
      return keyPath;
    }
  }
  return value || keyPath;
}
