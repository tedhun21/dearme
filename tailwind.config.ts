import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xxs: "400px",
        xs: "500px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        hel: ["Helvetica Neue"],
      },
      colors: {
        default: {
          100: "#FBFAF2",
          200: "#F5F3EB",
          300: "#EBE3D5",
          400: "#DED0B6",
          500: "#928C7F",
          600: "#857762",
          700: "#505050",
          800: "#143422",
        },
      },
      fontSize: {
        "2xs": ["0.625rem", "0.8rem"],
      },
    },
  },
  plugins: [],
};
export default config;
