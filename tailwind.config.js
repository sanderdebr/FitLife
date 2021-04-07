module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "signin-image":
          "url('https://source.unsplash.com/xB4ExGcUai0/1600x900')",
      }),
      colors: {
        primary: "#182277",
        primaryDark: "#10185e",
        secondary: "#FFB7E4",
        secondaryDark: "#de8cbf",
      },
    },
    fontFamily: {
      sans: ['"Inter"', "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
