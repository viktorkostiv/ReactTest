/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      "Montserrat": ["Montserrat"],
    },
    screens: {
      'phone': '480px',
      'sm': '640px',
      'md': '768px',
      'ml': '980px',
      'lg': '1024px',
      'xl': '1220px'
  },
    extend: {
      colors: {
        'brand-black': '#393939',
        'brand-gray': '#7E7E7E',
        'brand-orange': '#FFBD3D ',
        'brand-purple': '#B05CF3 '
      },
      boxShadow: {
        'brand': '0px 2px 10px 0px rgba(0, 0, 0, 0.10)',
      }
    },
  },
  plugins: [],
}