/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bfs-green-0': '#85C872',
        'bfs-green-1': '#C2EF7E',
        'bfs-green-2': '#5EA669',
        'bfs-blue': '#285A84',
        'bfs-background': '#FFFFFF'
      },
      fontFamily: {
        'montserrat-medium': ['Montserrat', 'sans-serif'],
        'montserrat-semibold': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}
