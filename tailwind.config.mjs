/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          white: '#f5f5f0',
          gold: '#c9a84c',
          'gold-muted': '#a8893e',
          'gray-900': '#111111',
          'gray-800': '#1a1a1a',
          'gray-700': '#242424',
          'gray-500': '#6b6b6b',
          'gray-300': '#a0a0a0',
          'indigo-deep': '#0d0816',
          'indigo-mid': '#1a0a2e',
          'indigo-card': '#120820',
          cyan: '#06b6d4',
          'cyan-bright': '#00f5ff',
        },
        bg: {
          DEFAULT: '#0a0a0a',
          secondary: '#111111',
          card: '#1a1a1a',
        },
        surface: '#111111',
        border: 'rgba(255, 255, 255, 0.08)',
        accent: {
          DEFAULT: '#c9a84c',
          hover: '#a8893e',
          muted: 'rgba(201, 168, 76, 0.1)',
        },
        text: {
          primary: '#f5f5f0',
          secondary: '#a0a0a0',
          muted: '#6b6b6b',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'heading-1': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'heading-2': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-3': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vw, 8rem)',
      },
      maxWidth: {
        'content': '1200px',
        'prose': '65ch',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'data-stream': 'dataStream 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dataStream: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

