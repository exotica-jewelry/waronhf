module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'alegreya-sans': ['Alegreya Sans'],
      },
    },
    fontSize: {
      xxs: ['0.875rem', '1.25rem'],
      xs: ['1rem', '1.5rem'],
      sm: ['1.125rem', '1.75rem'],
      base: ['1.25rem', '1.825rem'],
      lg: ['1.5rem', '2rem'],
      xl: ['1.875rem', '2.25rem'],
      '2xl': ['2.25rem', '2.5rem'],
      '3xl': ['3rem', '3.5rem'],
      '4xl': ['3.75rem', '4.25rem'],
      '5xl': ['4.5rem', '5rem'],
      '6xl': ['6rem', '7rem'],
      '7xl': ['8rem', '9rem'],
      '8xl': ['10rem', '11.25rem'],
      '9xl': ['12rem', '13.5rem'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      // Use the 'dark:' prefix to apply styles when dark mode is enabled. See:
      // https://tailwindcss.com/docs/dark-mode
      'dark-mode': {
        raw: '(prefers-color-scheme: dark)',
      },
      // Use the 'print:' prefix for print-only styles. See:
      // https://tailwindcss.com/docs/hover-focus-and-other-states#print-styles
      print: { raw: 'print' },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-textshadow'),
  ],
}
