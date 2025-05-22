/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    // …other paths
  ],
  theme: {
    extend: {
      fontFamily: {
        'helvetica-cyr': ['"Helvetica Neue Cyr"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
