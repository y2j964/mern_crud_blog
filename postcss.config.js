/* eslint-disable global-require */
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.jsx', './src/**/*.js', './public/index.html'],
  css: ['./src/tailwind.css'],
  // ignore any --is- modifier class
  whitelistPatterns: [/--is-/],

  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-simple-vars'),
    require('postcss-custom-media'),
    require('postcss-nested'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
