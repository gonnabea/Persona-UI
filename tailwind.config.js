module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#5531e4',
          200: '#4b34aa',
          300: '#372580',
        },
        gray: {
          100: '#eeeeee',
          200: '#e2e2e2',
          300: '#cccccc',
          400: '#B3B3B3',
          500: '#999999',
          600: '#777777',
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
