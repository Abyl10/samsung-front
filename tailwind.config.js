/* eslint-disable quotes */
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        unkempt: ['Unkempt', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        medieval: ['Medieval English', 'cursive'],
      },
      colors: {
        // Main colors
        'main-brown-900': '#372311',
        'main-brown-500': '#B39981',
        'main-orange-500': '#FFB343',
        'main-yellow-200': '#FFD9A0',
        'main-white': '#FFFCF2',

        // Additional colors
        'add-brown-700': '#4B3F33',
        'add-brown-600': '#6A5643',
        'add-yellow-400': '#FFC877',
        'add-gray-100': '#F9F9F9',
        'add-green-200': '#D6DFBE',

        'bg-primary': '#F1EEE4',
      },
      backgroundImage: {
        'login-bg': "url('/src/assets/login-background.png')",
        'paper-fibers': "url('/src/assets/paper-fibers.png')",
        'notes-bg': "url('https://i.imgur.com/0kjMcUe.png')",
      },
    },
  },
  plugins: [],
};
