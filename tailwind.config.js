/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
    extend: {
      container: {
        center: true
      },
    },
  },
  plugins: [
    function (props) {
      const gridChildPadding = {};
      gridChildPadding[`.grid > *`] = {
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
      };
      props.addComponents(gridChildPadding);
    },
  ],
}
