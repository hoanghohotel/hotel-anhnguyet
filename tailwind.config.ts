import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Bảng màu Hoàng Gia Ánh Nguyệt - Apple Liquid Glass
        champagne: {
          50: '#FDFBF7',
          100: '#FAF5EA',
          200: '#F4E8D0',
          300: '#EBD8B0',
          400: '#DEC28A',
          500: '#D4AF37', // Vàng kim Champagne chủ đạo
          600: '#B89325',
          700: '#94731A',
          800: '#735716',
          900: '#5A4313',
        },
        porcelain: {
          50: '#FFFFFF',
          100: '#F8F9FA',
          200: '#F1F3F5',
          300: '#E9ECEF',
          400: '#DEE2E6',
          500: '#CED4DA',
        },
        smoky: {
          800: '#1E232B',
          850: '#171B22',
          900: '#11151B',
          950: '#0B0E13',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'liquid-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'liquid-card': '0 20px 40px -15px rgba(0, 0, 0, 0.45)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '20px',
        '2xl': '32px',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.05)', opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
