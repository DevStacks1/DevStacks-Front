module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          primarycolor: "#20603d",
        },
      },
      fontFamily: {
        display: ["Roboto", "sans-serif"],
      },
    },
    variants: {
      extend: {
        opacity: ['disabled'],
        backgroundColor: ['disabled'],
        textColor: ['disabled'],
      },
    },
    plugins: [],
  }