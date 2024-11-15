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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "deep-blue": "#3D52A0",      
        "sky-blue": "#7091E6",       
        "steel-blue": "#8697C4",     
        "lavender-blue": "#ADBBDA",  
        "mist-blue": "#EDE8F5",
        "platinum": "#F0F0F0"      
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [],
};
export default config;
