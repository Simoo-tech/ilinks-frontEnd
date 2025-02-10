/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#001021",
        color1: "#ec5b53",
        color2: "#fffcf9",
        color3: "#a33327",
        colorBottonsDark: "white",
        colorBorderDark: "#404040",
        colorBlue2: "#141E46",
        colorTheme2: "#fefafa",
        colorPink: "#fc8452",
        colorRed: "#C70039",
        colorGreen: "#17252a",
        colorGreen2: "#2b7a78",
        colorGreen3: "#def2f1",
        colorGreen4: "#feffff",
        mainColor1: "#c7493a",
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
      container: {
        center: true,
        padding: {
          sm: "1.5rem",
          md: "2rem",
          lg: "2rem",
          xl: "2.5rem",
        },
      },
      screens: {
        "2xl": "1535px",
        xl: "1279px",
        lg: "1023px",
        md: "670px",
        sm: "300px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
    base: false,
  },
};
