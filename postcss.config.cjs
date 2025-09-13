module.exports = {
  /**
   * @type {import('postcss').Plugin[]}
   */
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
    require('cssnano'),
  ],
};