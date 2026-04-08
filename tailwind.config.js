/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        navy: "#061429",
        gold: "#F4C430",
        "gold-light": "#FDF3CC",
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
