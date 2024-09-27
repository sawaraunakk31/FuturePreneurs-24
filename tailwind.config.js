/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {

      'pn':'492px',
      // => @media (min-width: 492px) { ... }
  
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
       'sm2':'916px',
      'md': '1024px',
      // => @media (min-width: 1024px) { ... }

      'lg': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        anton: ['Anton','sans-serif'],
        gotham:['Gotham Black','sans-serif'],
        gotham:['GothamBlack','sans-serif'],
        outfit:['Outfit Black','sans-serif'],
        almarai:['Almarai','sans-serif'],
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

// module.exports = {
//   theme: {
//     extend: {
//       backgroundImage: {
//         'custom-faq-background': "url('../FuturePreneurs-24/assests/assests/FAQs.png')",
//       }
//     }
//   }
// }
