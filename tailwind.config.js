const { cyan } = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/services/categories.ts',
    './src/services/contentful.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      fontFamily: {
        dosis: ['Dosis', 'sans-serif'],
        IBM: ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        grey: {
          default: '#808080',
          light: '#F2F2F7',
        },
        blue: {
          default: '#1E2F79',
        },
        green: {
          default: '#6ED8B4',
        },
        sante: '#D76478',
        social: '#E6AA50',
        interpretariat: '#C693C2',
        cyan,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.grey.default'),
            h1: {
              display: 'none',
            },
            h2: {
              color: theme('colors.green.default'),
              fontSize: '2.25rem',
              borderTopWidth: '1px',
              borderTopColor: theme('colors.grey.300'),
              pageBreakBefore: 'always',
              paddingTop: '2rem',
            },
            h3: {
              color: theme('colors.blue.default'),
            },
            h4: {
              color: theme('colors.blue.default'),
            },
            h5: {
              color: theme('colors.blue.default'),
            },
            h6: {
              color: theme('colors.blue.default'),
            },
            blockquote: {
              color: theme('colors.green.default'),
              borderLeftColor: theme('colors.green.default'),
              paddingTop: '0.375rem',
              paddingBottom: '0.375rem',
            },
            ul: {
              li: {
                '&:before': {
                  backgroundColor: theme('colors.green.default'),
                },
              },
            },
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
