/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',     // #285A84
        'accent-1': 'var(--color-accent-1)', // #85C872
        'accent-2': 'var(--color-accent-2)', // #C2EF7E
        'accent-3': 'var(--color-accent-3)', // #5EA669
        background: 'var(--color-background)', // #FFFFFF
      },
      fontFamily: {
        primary: ['var(--font-primary)', 'sans-serif'],
      },
      fontWeight: {
        medium: 500,
        semibold: 600,
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
