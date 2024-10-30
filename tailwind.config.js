/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        aetna: {
          purple: '#7B1FA2',
          'purple-light': '#9C27B0',
          'purple-dark': '#4A0072',
        },
      },
    },
  },
  plugins: [],
};