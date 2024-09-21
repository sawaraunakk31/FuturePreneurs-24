/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton','sans-serif'],
        gotham:['Gotham Black','sans-serif'],
      },
      colors: {
        'custom-blue-light': '#137FC1',
        'custom-blue-dark': '#0D70AD',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #137FC1 0%, #105B88 52%, #0D70AD 100%)',
      },
    },
  },
  variants: {},
  plugins: [],
};
