/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme_clr_1: "var(--theme-clr-1)",
        theme_clr_2: "var(--theme-clr-2)",
        theme_clr_3: "var(--theme-clr-3)",
        theme_clr_4: "var(--theme-clr-4)",
        text_clr_1: "var(--font-clr-1)",
        text_clr_2: "var(--font-clr-2)",
        text_clr_3: "var(--font-clr-3)",
        text_clr_4: "var(--font-clr-4)",
        text_clr_5: "var(--font-clr-5)",
        icon_clr_1: "var(--icon-clr-1)",
        icon_clr_2: "var(--icon-clr-2)",
        glass: "#070a17",
      },
      fontSize: {
        "2xs": "var(--font-size-2xs)",
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        md: "var(--font-size-md)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
        "6xl": "var(--font-size-6xl)",
        "7xl": "var(--font-size-7xl)",
        "8xl": "var(--font-size-8xl)",
        "9xl": "var(--font-size-9xl)",
        "10xl": "var(--font-size-10xl)",
        "11xl": "var(--font-size-11xl)",
        "12xl": "var(--font-size-12xl)",
      },
      boxShadow: {
        swiper_shadow: "var(--swiper-shadow)",
      },
      fontFamily: {
        PlayFair: "var(--font-family-alt-1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }, // small movement
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("@tailwindcss/forms")],
};
