/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#101C29',
        'navy-2': '#172432',
        'off-white': '#F3EFE7',
        'bg-light': '#FAF9F6',
        dark: '#151A1F',
        muted: '#737B82',
        accent: '#B7A184',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5.5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'section': ['clamp(1.6rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'content': '80rem',
        'prose': '60ch',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
