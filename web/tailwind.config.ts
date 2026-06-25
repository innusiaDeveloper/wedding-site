import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-ui)", "sans-serif"],
        ui: ["var(--font-ui)", "sans-serif"],
      },
      colors: {
        brand: {
          dark: "#2D2814",
          deep: "#3D060D",
          green: "#5B0B14",
          hover: "#8E2A38",
          brown: "#5F4E32",
          olive: "#7A1B26",
          light: "#8A5A5E",
          paper: "#FFFFFF",
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
