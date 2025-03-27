import type { Config } from 'tailwindcss'
import flowbiteReact from 'flowbite-react/plugin/tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '.flowbite-react\\class-list.json'],
  theme: {
    extend: {
      height: {
        header: '52px',
        logo: '26px'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '8rem'
      }
    }
  },
  plugins: [flowbiteReact]
}

export default config
