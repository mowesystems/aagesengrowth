/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // --- Ground -----------------------------------------------------------
        // Near black, not navy. The site sits at the bottom of the value range so
        // that a single lit edge or a photograph reads as an event.
        ink: '#050608',
        'ink-2': '#0B0D12',
        'ink-3': '#131722',

        // --- Editorial off-white ----------------------------------------------
        paper: '#F2EFE8',
        'paper-2': '#FFFFFF',

        // Body copy on ink — 7.9:1
        muted: '#9EA3AA',
        // Body copy on paper — 6.4:1
        'muted-ink': '#565E68',

        // --- Iridescent accents ------------------------------------------------
        // Used as light moving across glass: a few large words, selected rules,
        // hover states, metric accents. Never a background wash on a card.
        lime: '#B8FF45',
        cyan: '#5EEBFF',
        violet: '#7657FF',
        magenta: '#FF4FD8',
        // The one accent that is safe as small text on paper — 6.9:1
        'accent-ink': '#4B2ED6',
      },
      fontFamily: {
        display: ['Instrument Serif', 'Times New Roman', 'serif'],
        sans: ['Inter Tight', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // ~9.4vw lands at 100–144px across desktop widths, 48px floor on phones.
        hero: ['clamp(3rem, 9.4vw, 9.5rem)', { lineHeight: '0.86', letterSpacing: '-0.035em' }],
        statement: ['clamp(2.5rem, 6.4vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        display: ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '0.94', letterSpacing: '-0.028em' }],
        section: ['clamp(1.9rem, 3.6vw, 3.25rem)', { lineHeight: '0.98', letterSpacing: '-0.024em' }],
        title: ['clamp(1.35rem, 2.1vw, 1.95rem)', { lineHeight: '1.06', letterSpacing: '-0.018em' }],
        lead: ['clamp(1.0625rem, 1.25vw, 1.1875rem)', { lineHeight: '1.6' }],
      },
      spacing: { 18: '4.5rem', 22: '5.5rem', 26: '6.5rem', 30: '7.5rem', 38: '9.5rem' },
      maxWidth: { frame: '90rem', prose: '64ch', measure: '52ch' },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0.16, 0.84, 0.44, 1)',
      },
      // The consent card sits above the header but below the mobile menu: when
      // someone has just opened the menu, that is the thing they asked for.
      zIndex: { header: '60', consent: '65', menu: '70' },
    },
  },
  plugins: [],
};
