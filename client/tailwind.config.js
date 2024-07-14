/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      maxHeight: {
        '128': '32rem', 
        '144': '36rem', 
        '82': '22rem'
      },
      colors: {
        customOrange: '#ffa323',
      },
    },
  },
  plugins: [],
}