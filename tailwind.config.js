/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0B0F19',
        ink: '#0E1422',
        surface: '#111827',
        surfacealt: '#151D2E',
        line: '#1E293B',
        cyan: {
          DEFAULT: '#22D3EE',
          soft: '#67E8F9',
        },
        teal: {
          DEFAULT: '#2DD4BF',
          soft: '#5EEAD4',
        },
        crimson: {
          DEFAULT: '#F43F5E',
          soft: '#FB7185',
        },
        amber: {
          DEFAULT: '#F59E0B',
          soft: '#FBBF24',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.85) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        floatY: 'floatY 4s ease-in-out infinite',
        scanline: 'scanline 6s linear infinite',
        popIn: 'popIn 0.35s ease-out forwards',
        shake: 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
};
