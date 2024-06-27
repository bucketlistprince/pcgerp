/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        navBgColor: '#224957'
      },
      button: {
        green: 'text-sm bg-green-500 hover:bg-green-300 font-bold text-black py-1 px-4 rounded',
      },
    },
    
  },
  plugins: [
    'tailwindcss',
    'autoprefixer',
  
  ],
};
