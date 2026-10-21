/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14213D',
          50: '#EEF1F6',
          100: '#D9DFEA',
          200: '#AEB9D1',
          300: '#8393B5',
          400: '#586D99',
          500: '#37507D',
          600: '#243D67',
          700: '#1A2E51',
          800: '#14213D',
          900: '#0D162A',
        },
        paper: '#F4F6F8',
        card: '#FFFFFF',
        line: '#E2E5EA',
        muted: '#667085',
        signal: {
          DEFAULT: '#E8722C',
          50: '#FDF1E8',
          100: '#FBE1CC',
          500: '#E8722C',
          600: '#CC5D1B',
        },
        teal: {
          DEFAULT: '#1F9C8B',
          50: '#E7F6F3',
          100: '#C7EBE3',
          500: '#1F9C8B',
          600: '#177E71',
        },
        amber: {
          DEFAULT: '#F2B134',
          50: '#FEF6E4',
          100: '#FCE8BC',
          500: '#F2B134',
          600: '#D6961A',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 33, 61, 0.06), 0 1px 8px rgba(20, 33, 61, 0.04)',
        pop: '0 8px 24px rgba(20, 33, 61, 0.12)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
}
