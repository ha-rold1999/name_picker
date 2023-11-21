/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'green':'#1AC059',
        'button':'#FFAD33',
        'secondary':'#17A14B',
        'grey':"#888888",
        'orange':'#FFAD33'
      }
    },
  },
  plugins: [],
};
