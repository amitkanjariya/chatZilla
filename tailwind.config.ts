import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '60%': '60%',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      startegy : 'class'
    })
  ],
} satisfies Config;
