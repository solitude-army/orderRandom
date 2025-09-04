/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 美食主题暖橙色调色板
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // 主色调
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF6B35', // 品牌主色
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        warm: {
          50: '#fefdf8',
          100: '#fef7e0',
          200: '#fdecc8',
          300: '#fbd9a5',
          400: '#f8c572',
          500: '#f4a261',
          600: '#e76f51',
          700: '#d4533c',
          800: '#b8432f',
          900: '#9c3626',
        },
        food: {
          cream: '#FFF8DC',
          butter: '#FFDB58',
          caramel: '#D2691E',
          cinnamon: '#D2691E',
          paprika: '#CC6600',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 14px 0 rgba(255, 107, 53, 0.15)',
        'warm-lg': '0 10px 25px -3px rgba(255, 107, 53, 0.1), 0 4px 6px -2px rgba(255, 107, 53, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FF6B35 0%, #F4A261 100%)',
        'gradient-food': 'linear-gradient(135deg, #FFF8DC 0%, #FFDB58 50%, #FF6B35 100%)',
      },
    },
  },
  plugins: [],
}
