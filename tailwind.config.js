/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        foreground: 'rgb(var(--color-foreground-rgb) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
