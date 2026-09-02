/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // --- Ink ---------------------------------------------------------
        // The navy-black the wordmark is drawn in. Body copy on paper, and the
        // ground of the dark sections. Not a neutral grey: it carries the blue.
        ink: '#0B1220',
        'ink-2': '#111A2C',
        'ink-3': '#1B2740',

        // --- Paper -------------------------------------------------------
        // The warm off-white the live site already runs on.
        paper: '#F7F6F2',
        'paper-2': '#FFFFFF',
        'paper-3': '#EFEDE6',

        // --- Brand blue --------------------------------------------------
        // Descended from the two rules in the wordmark (#0447F8). `brand` is
        // the one that carries buttons and links on paper — 5.8:1 on paper,
        // 6.3:1 white-on-blue. `lit` is its counterpart on ink — 5.9:1.
        brand: '#1B4FE8',
        'brand-deep': '#0F35B0',
        'brand-lit': '#5B8CFF',
        'brand-tint': '#EDF2FF',
        'brand-rule': '#0447F8',

        // Body copy on paper — 5.5:1. Body copy on ink — 7.7:1.
        muted: '#5A6478',
        'muted-lit': '#9AA6BF',
      },
      fontFamily: {
        // Instrument Serif is the wordmark's own species — it carries the
        // editorial moments. Inter Tight (variable, one file) carries the
        // oversized statements and all UI. Plex Mono carries indices.
        display: ['Instrument Serif', 'Times New Roman', 'serif'],
        sans: ['Inter Tight', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Sized against the column each one lives in, not against the
        // viewport alone: the hero sits in a six-column slot beside the
        // mockups, so 6.4vw is what fills it — 10vw overflowed it onto four
        // lines. The clamps hold a 44px floor on a 360px phone.
        hero: ['clamp(2.75rem, 6.4vw, 6.25rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
        statement: ['clamp(2.25rem, 5.4vw, 5rem)', { lineHeight: '0.94', letterSpacing: '-0.032em' }],
        display: ['clamp(1.95rem, 4.1vw, 3.5rem)', { lineHeight: '0.98', letterSpacing: '-0.028em' }],
        section: ['clamp(1.6rem, 2.9vw, 2.4rem)', { lineHeight: '1.02', letterSpacing: '-0.022em' }],
        title: ['clamp(1.2rem, 1.7vw, 1.5rem)', { lineHeight: '1.14', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.0625rem, 1.15vw, 1.1875rem)', { lineHeight: '1.58' }],
        price: ['clamp(1.9rem, 3.2vw, 2.75rem)', { lineHeight: '1', letterSpacing: '-0.028em' }],
      },
      spacing: { 18: '4.5rem', 22: '5.5rem', 26: '6.5rem', 30: '7.5rem', 38: '9.5rem', 46: '11.5rem' },
      maxWidth: { frame: '92rem', prose: '66ch', measure: '52ch' },
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
