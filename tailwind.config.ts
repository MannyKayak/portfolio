import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "card-size": "var(--card-text-size)",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite ease-in-out",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        color1: "var(--color1)",
        color2: "var(--color2)",
        color3: "var(--color3)",
        color4: "var(--color4)",
      },
    },
  },
  plugins: [],
} satisfies Config;
