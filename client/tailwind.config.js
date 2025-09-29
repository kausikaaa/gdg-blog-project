/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: '#4ade80',
      },
      boxShadow: {
        cardSoft: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        card: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -2px rgb(0 0 0 / 0.03)',
        cardLg: '0 20px 25px -5px rgb(0 0 0 / 0.10), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
        cardHover: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
      }
    },
  },
  plugins: [],
}

