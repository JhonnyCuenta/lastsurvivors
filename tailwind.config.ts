import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/config/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bunker: {
          950: '#070909',
          900: '#0c1110',
          850: '#101615',
          800: '#16201d',
        },
        ash: '#b9b3a7',
        rust: '#c44b32',
        ember: '#e19935',
        radiation: '#9dbc48',
        signal: '#5eb9ba',
      },
      boxShadow: {
        panel: '0 20px 60px rgb(0 0 0 / 0.32)',
      },
      fontFamily: {
        sans: ['var(--font-interface)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
