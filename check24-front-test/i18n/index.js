var en = require('./translations/en.json');
var es = require('./translations/es.json');

const i18n = {
  translations: {
    en: {
      ...en.i18n
    },
    es: {
      ...es.i18n
    }
  },
  defaultLang: 'es',
  languageDataStore: 'localStorage'
};

module.exports = i18n;
