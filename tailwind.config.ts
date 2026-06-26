import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A96E",
          light: "#E2C898",
          dark: "#A07840",
        },
        dark: {
          DEFAULT: "#0D0D0D",
          100: "#1A1A1A",
          200: "#242424",
          300: "#2E2E2E",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,169,110,0.4)" },
          "50%": { boxShadow: "0 0 0 15px rgba(201,169,110,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
