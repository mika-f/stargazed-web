module.exports = {
  purge: [
    "./src/**/*.{ts,tsx}",
    "./public/index.html",
  ],
  darkMode: "class",
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [
    function({addComponents}) {
      addComponents({
        ".container": {
          maxWidth: "90%",
          "@screen sm": {
            maxWidth: "600px",
          },
          "@screen md": {
            maxWidth: "700px",
          },
          "@screen lg": {
            maxWidth: "900px",
          },
          "@screen xl": {
            maxWidth: "1200px",
          },
        }
      })
    },
    require("nightwind")
  ],
}
