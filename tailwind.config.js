/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        p5font: ['"p5hatty"'],
        markinLT: ['"Markin LT UltraBold"'],
        exposeregular: ['"Expose Regular"'],
        p5menu: ['"Persona5MenuFontPrototype Regular"']
      },
      colors: {
        'p5-bg': '#1a0303'
      }
    },
  },
  plugins: [],
}

