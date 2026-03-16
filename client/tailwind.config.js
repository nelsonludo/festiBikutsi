/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E65100", // Deep Orange
          dark: "#BF4300",
        },
        secondary: {
          DEFAULT: "#b12f11", // Bold Red
          dark: "#94240e",
        },
        beti: {
          earth: "#4E342E",
          clay: "#8D6E63",
          raffia: "#D7CCC8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      backgroundImage: {
        "texture-organic":
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
        "texture-clay":
          "url('https://www.transparenttextures.com/patterns/xv.png')",
      },
      borderRadius: {
        clay: "1.5rem",
      },
    },
  },
  plugins: [],
};
