/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: { custom: ["0px 0px 100px rgba(3, 105, 161, 0.8)"] },
      screens: {
        xs: "475px",
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
      },
      spacing: {
        100: 448,
      },

      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
  plugins: [],
};
