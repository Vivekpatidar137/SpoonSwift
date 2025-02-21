/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      animation: {
        bounce: "bounce 1s ease-in-out 1",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none", // For IE 11
          "scrollbar-width": "none", // For Firefox
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none", // For Chrome, Safari, and Edge
        },
      });
    },
  ],
};
