/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.{js,ts,jsx,tsx,vue,blade.php}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // accent
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d', // primary dark
        },
        card: '#f8fafc',
        'card-foreground': '#14532d',
        primary: '#14532d',
        'primary-foreground': '#ffffff',
        secondary: '#22c55e',
        'secondary-foreground': '#14532d',
        accent: '#22c55e',
        'accent-foreground': '#14532d',
        muted: '#e5e7eb',
        'muted-foreground': '#14532d',
        border: '#d1fae5',
        input: '#d1fae5',
        ring: '#22c55e',
      },
      borderRadius: {
        lg: '1rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
