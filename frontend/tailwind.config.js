/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#5b68f4',
        'primary-purple': '#8b7ff6',
        'primary-light': '#c7d2fe',
        'accent-blue': '#4f46e5',
      },
    },
  },
  plugins: [],
}
