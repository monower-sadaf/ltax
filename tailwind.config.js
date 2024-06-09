const { mauve, violet } = require('@radix-ui/colors');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '10': '0.625em',
        '12': '0.75em',
        '13': '0.8125em',
        '14': '0.875em',
        '15': '0.9375em',
        '16': '1em',
        '18': '1.125em',
        '20': '1.25em',
        '22': '1.375em',
        '24': '1.5em',
        '26': '1.625em',
        '28': '1.75em',
        '30': '1.875em',
        '32': '2em',
        '36': '2.25em',
        '40': '2.5em',
        '48': '3em',
      },
      colors: {
        primary: '#12633D',
        secondary: '#198754',
        lightgreen: '#F0F8F3',
        green1: '#1B1D1C',
        green2: '#0F6800',
        green3: '#153A20',
        black1: '#2B2B2B',
        green4: '#F2FAF4',
        deepgreen: '#368C72',
        green5: '#1E433D',
        magenta: '#8600B5',
        ...mauve,
        ...violet,
      },
      fontFamily: {
        nikosh: ['nikosh', 'sans-serif'],
        kalpurush: ['kalpurush', 'sans-serif']
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      },

    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
