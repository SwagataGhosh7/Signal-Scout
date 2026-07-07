/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0B0F17',
        neon: '#22C55E',
        accent: '#10B981',
      },
    },
  },
  plugins: [],
}
