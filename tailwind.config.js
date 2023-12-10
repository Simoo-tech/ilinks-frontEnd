/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        colorDark2: "#222222",
        colorDark1: " #0D0D0D",
        colorBottonsDark: "white",
        colorBorderDark: "#404040",
        colorBlue1: "#16213E",
        colorBlue2: "#141E46",
        colorSimo1: "#ec5b53",
        colorTheme2: "#fefafa",
        colorPink: "#fc8452",
        colorRed: "#C70039",
        colorGreen: "#17252a",
        colorGreen2: "#2b7a78",
        colorGreen3: "#def2f1",
        colorGreen4: "#feffff",
        mainColor1: "#c7493a",
        mainColor2: "#a33327",
        mainColor3: "#689775",
        mainColor4: "#917164",
        mainColor5: "#ad8174",
      },
      animation: {
        spiner: "spiner 2s infinite linear",
      },
      keyframes: {
        spiner: {
          "0% ": {
            left: "0%",
          },
          "100%": { left: "100%" },
        },
      },
    },
    screens: {
      sm: "350px",
      md: "768px",
      lg: "996px",
      xl: "1440px",
    },
    container: {
      center: true,
      padding: {
        sm: ".1rem",
        lg: ".1rem",
        xl: ".2rem",
      },
    },
  },
  plugins: [require("tailwindcss-3d")],
};

// #c7493a
// #a33327
// #689775
// #917164
// #ad8174
