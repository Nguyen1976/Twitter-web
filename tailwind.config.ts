import type { Config } from 'tailwindcss'
import flowbiteReact from 'flowbite-react/plugin/tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '.flowbite-react\\class-list.json'],
  theme: {
    extend: {}
  },
  plugins: [flowbiteReact]
}

export default config
