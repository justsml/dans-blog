module.exports = {
  /**
   * @type {import('postcss').Plugin[]}
   */
  plugins: [
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano'),
  ],
};