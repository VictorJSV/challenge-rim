/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'lato': ['"Lato"', 'sans-serif'],
    },
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
        xxs: ['0.625rem', '1rem'],
        xs: ['0.75rem', '1.25rem'],
        sm: ['0.875rem', '1rem'],
        base: ['1rem', '1.25rem'],
        lg: ['1.125rem', '1.25rem'],
        '2.5xl': ['1.75rem', '2.25rem'],
        '4.5xl': ['2.5rem', '3rem'],
      },
      colors: {
        'neutral-100': '#FAFBFF',
        'neutral-200': '#EDEFFC',
        'neutral-400': '#D7DBF5',
        'neutral-500': '#A9AFD9',
        'neutral-600': '#7981B2',
        'neutral-700': '#141938',
        'gray-60': '#5E6488',
        'gray-80': '#2B304E',
        'gray-100': '#03050F',
        'feedback-success': '#389E0D',
        'green-aqua': '#7DF0BA',
        'red-500': '#FF1C44',
        'blue-berry': '#4F4FFF'
      },
      boxShadow: {
        'large': '0px 1px 32px 0px #AEACF359',
      }
    },
  },
  plugins: [],
}
