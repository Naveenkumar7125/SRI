/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0A192F',
        steel: '#2E3B4E',
        neonBlue: '#00B4D8',
        alertRed: '#FF4C4C',
        successGreen: '#21C55D',
        textPrimary: '#E0E0E0',
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
