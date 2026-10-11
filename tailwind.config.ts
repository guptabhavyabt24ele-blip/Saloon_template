import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        accent: '#B89A67',
        sand: '#F8F6F0',
        bone: '#F8F6F0',
        linen: '#F8F6F0',
        ink: '#1A1918',
        'warm-stone': '#E5E0D8',
        champagne: '#B89A67',
        'champagne-soft': '#C5A880',
        espresso: '#6B6864'
      },
      letterSpacing: {
        editorial: '0.25em'
      },
      borderRadius: {
        architectural: '14px'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif']
      }
    }
  },
  plugins: []
};

export default config;
