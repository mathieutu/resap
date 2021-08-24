const { cyan } = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/services/categories.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
