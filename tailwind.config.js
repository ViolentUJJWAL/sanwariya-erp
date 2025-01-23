/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Include all source files in the `src` directory
    './public/index.html',             // Include your HTML files (if any)
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow-2': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
};
