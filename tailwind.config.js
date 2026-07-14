/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif"', 'serif'],
      },
      animation: {
        "spinner-blade": "spinner-blade 1s linear infinite",
      },
      keyframes: {
        "spinner-blade": {
          "0%": { opacity: "0.85" },
          "50%": { opacity: "0.25" },
          "100%": { opacity: "0.25" },
        },
      },
    },
  },
  plugins: [],
}