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
        white: "#f1f1f1",
        black: "#1a1a1a",
        'blue-default': '#415AC1',
        'blue-dark': '#2F80EC'
      },
      gridTemplateColumns: {
        header: "250px 1fr 250px",
      },
      cursor: {
        arrow: "url('/icons/arrow-cursor.svg'), auto",
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
};
export default config;
