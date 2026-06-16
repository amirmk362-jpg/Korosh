/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0b0a08",
          deep: "#050505",
          raised: "#14120f",
        },
        gold: {
          DEFAULT: "#caa24a",
          bright: "#e8c873",
          dim: "#8a6d2e",
        },
        crimson: {
          DEFAULT: "#7a1228",
          deep: "#4a0a18",
        },
        ivory: "#ece3cf",
        lapis: "#1f3a5f",
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
