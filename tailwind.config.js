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
        secondary: "#FFB7E4",
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
