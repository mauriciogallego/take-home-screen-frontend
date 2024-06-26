/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  i18n: {
    localeDetection: false,
    defaultLocale: 'es',
    locales: ['es'],
    localePath: path.resolve('./public/locales'),
  },
};
