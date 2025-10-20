/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    /* screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }, */
    screens: {
      'sm': '384px',
      'md': '1120px',
    },
    container: {
      center: true,
    },
    extend: {
      /* screens: {
        'sm': '384px',
        //'md': '1120px',
      }, */
      fontSize: {
        base: ['1rem', '1.25rem'],
        lg: ['1.125rem', '1.25rem'],
        'text-3xl': ['2rem', '2.5rem'],
      },
      colors: {
        'gray-80': '#2B304E',
        'gray-100': '#03050F',
      }
    },
  },
  plugins: [],
}
