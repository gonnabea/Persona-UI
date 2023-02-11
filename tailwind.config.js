module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  // darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#5531e4',
          200: '#4b34aa',
          300: '#372580',
        },
        gray: {
          100: '#f7f7f7',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#b2b2b2',
          500: '#808080',
        },
        typo: {
          black: {
            primary: '#222222',
            secondary: '#444444',
          },
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
