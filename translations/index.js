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
  // Handle keys with dots (like "Jisho.org") by trying literal key lookup first
  const keys = keyPath.split('.');
  let value = translations[lang];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      // Key not found - try remaining keys joined with dot as literal key
      const remainingKey = keys.slice(i).join('.');
      if (value && typeof value === 'object' && remainingKey in value) {
        value = value[remainingKey];
      } else if (lang !== 'en') {
        // Fallback to English
        value = translations.en;
        for (let j = 0; j < keys.length; j++) {
          const k = keys[j];
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            const fallbackKey = keys.slice(j).join('.');
            if (value && typeof value === 'object' && fallbackKey in value) {
              value = value[fallbackKey];
            } else {
              console.warn(`Translation missing: ${keyPath}`);
              return keyPath;
            }
          }
        }
      } else {
        console.warn(`Translation missing: ${keyPath}`);
        return keyPath;
      }
      break;
    }
  }
  return value || keyPath;
}
