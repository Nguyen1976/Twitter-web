import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import type { AcceptedPlugin } from 'postcss'

const config: { plugins: AcceptedPlugin[] } = {
  plugins: [tailwindcss(), autoprefixer()]
}

export default config
