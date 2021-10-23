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
      fontFamily: {
        'dosis' : ['Dosis', 'sans-serif'],
        'IBM' : ['IBM Plex Sans', 'sans-serif']
      },
      colors: {
        grey: {
          default: "#808080",
          light: "#F2F2F7"
        },
        blue: {
          default: "#1E2F79"
        },
        green: {
          default: "#6ED8B4"
        },
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
