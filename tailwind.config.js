/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens:{
     'tablet':'400px',
     'laptop':'1000px',
     'xl':'1200px',
     '2xl':'1600px'
    },
    extend: {
      colors: {
        "custom-dark-blue": "#000018",
        "inputBack": "#BBBBBB",
      
      },
      backgroundImage:{
        'LoginBtn':"url('/src/assets/Images/LoginBtn.png')",
        'LoginBack':"url('/src/assets/Images/LoginBack.png')",
        'Interview':"url('/src/assets/Images/InterviewScreen.png')",

      },
      fontFamily:{
        poppins:["Poppins", "sans-serif"]
      }
      
      
    },
  },
  plugins: [],
};
