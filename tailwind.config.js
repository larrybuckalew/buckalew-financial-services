/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',     /* #285A84 */
        'accent-1': 'var(--color-accent-1)', /* #85C872 */
        'accent-2': 'var(--color-accent-2)', /* #C2EF7E */
        'accent-3': 'var(--color-accent-3)', /* #5EA669 */
        background: 'var(--color-background)', /* #FFFFFF */
      },
      fontFamily: {
        primary: ['var(--font-primary)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
