import type { Config } from 'tailwindcss'
import flowbiteReact from 'flowbite-react/plugin/tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '.flowbite-react\\class-list.json'],
  theme: {
    extend: {
      height: {
        header: '52px',
        logo: '26px'
      },
      fontFamily: {
        sans: ['Chirp', 'sans-serif']
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '4rem',
        '2xl': '8rem'
      }
    }
  },
  plugins: [flowbiteReact]
}

export default config
