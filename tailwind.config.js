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
      'md': '1168px',
    },
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        'aqua-lemon': 'linear-gradient(to right, #00F4E2, #00FF7F)',
      },
      fontSize: {
        xs: ['0.75rem', '1.25rem'],
        sm: ['0.875rem', '1rem'],
        base: ['1rem', '1.25rem'],
        lg: ['1.125rem', '1.25rem'],
        '2xl': ['1.75rem', '2.25rem'],
      },
      colors: {
        'gray-60': '#5E6488',
        'gray-80': '#2B304E',
        'gray-100': '#03050F',
      }
    },
  },
  plugins: [],
}
