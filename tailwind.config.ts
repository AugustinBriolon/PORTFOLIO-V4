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
        'green-pulse' : '#629460',
      },
      gridTemplateColumns: {
        header: "250px 1fr 250px",
        "project-info": "100px 1fr",
      },
      cursor: {
        arrow: "url('/icons/arrow-cursor.svg'), auto",
      }
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
