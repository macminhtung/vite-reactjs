/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      white: 'white',
      black: 'black',
      orange: '#F99444',
      lightOrange: '#f9944438',
      gray: '#585656',
      lightGray: '#29292929',
      green: '#59ca45',
      lightGreen: '#59ca4529',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
    },
    fontFamily: {
      sans: ['DMSans', 'sans-serif'],
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.main-container': {
          width: 'calc(100vw - 4rem)',
          padding: '2rem',
        },
        '.center-center': {
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.span-text-white': {
          span: {
            color: theme('colors.white'),
          },
          svg: {
            fill: theme('colors.white'),
          },
        },
      });
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};
