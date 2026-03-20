/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand — inspired by teal/verdant property tones, wholly original palette
        sage: {
          50:  '#f0faf4',
          100: '#dcf5e7',
          200: '#bcebd1',
          300: '#8ed9b3',
          400: '#59c18e',
          500: '#35a571',   // primary CTA
          600: '#268a5c',
          700: '#1e6e4a',
          800: '#1a583c',
          900: '#174832',
          950: '#0b2a1e',
        },
        // Neutral slate with a warm undertone
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f3',
          200: '#e8e8e4',
          300: '#d4d4ce',
          400: '#a8a89e',
          500: '#7c7c72',
          600: '#5e5e56',
          700: '#474740',
          800: '#2e2e28',
          900: '#1c1c18',
        },
        // Accent — amber for warnings/pending
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        // Status colours
        status: {
          approved:  '#22c55e',
          pending:   '#f59e0b',
          rejected:  '#ef4444',
          inactive:  '#94a3b8',
        },
      },
      fontFamily: {
        // Display: DM Sans — geometric, friendly, modern
        display: ['"DM Sans"', 'sans-serif'],
        // Body: IBM Plex Sans — technical credibility, excellent readability
        body: ['"IBM Plex Sans"', 'sans-serif'],
        // Mono: JetBrains Mono — clean metadata/IDs
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      boxShadow: {
        'nav':    '0 1px 0 0 rgba(0,0,0,0.06)',
        'card':   '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'popover':'0 10px 25px -3px rgba(0,0,0,0.1), 0 4px 10px -2px rgba(0,0,0,0.06)',
        'sidebar':'2px 0 8px 0 rgba(0,0,0,0.04)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        'slide-in-left': {
          '0%':   { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)',     opacity: '1' },
        },
        'fade-up': {
          '0%':   { transform: 'translateY(6px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',   opacity: '1' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.22s ease-out',
        'fade-up':       'fade-up 0.18s ease-out',
        'pulse-dot':     'pulse-dot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
