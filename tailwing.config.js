/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "slate-750": "#1e293b",
        "slate-850": "#0f1729",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        flow: "flow 2s linear infinite",
      },
      keyframes: {
        flow: {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-20" },
        },
      },
    },
  },
  plugins: [],
};
