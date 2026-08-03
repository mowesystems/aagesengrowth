/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // --- Ink: the site's ground -----------------------------------------
        ink: '#080D13',
        'ink-2': '#0F161F',
        'ink-3': '#18212C',

        // --- Cream: type on ink, and the contrast surface --------------------
        cream: '#F4F1EA',
        'cream-2': '#FFFFFF',

        // Body copy on ink — 9.08:1
        dim: '#A8B2BE',
        // Body copy on cream — 6.75:1
        'dim-ink': '#4A5560',

        // --- Accent ----------------------------------------------------------
        // On ink: 9.84:1. On cream, use gold-ink instead.
        gold: '#D4B478',
        'gold-ink': '#7A5C38',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        statement: ['clamp(2.6rem, 6.6vw, 6.5rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        display: ['clamp(2rem, 4.6vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.026em' }],
        section: ['clamp(1.8rem, 3.4vw, 3rem)', { lineHeight: '1.06', letterSpacing: '-0.022em' }],
      },
      spacing: { 18: '4.5rem', 22: '5.5rem', 30: '7.5rem' },
      maxWidth: { content: '84rem', prose: '62ch' },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0.16, 0.84, 0.44, 1)',
      },
    },
  },
  plugins: [],
};
