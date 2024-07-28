import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "serene-blue": "#6DA3C4", // A serene, calming blue
        "gentle-coral": "#FF847C", // A gentle, comforting coral
        "soothing-green": "#A4D9B9", // A soothing, refreshing green
        "warm-yellow": "#F9C74F", // A warm, inviting yellow
        "soft-purple": "#B28DFF", // A soft, elegant purple
        "mellow-teal": "#88BDBC", // A mellow, subtle teal
        "pale-white": "#FDFDFD", // A pale, almost white for backgrounds
        "cool-slate": "#3A506B", // A cool, sophisticated slate
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
