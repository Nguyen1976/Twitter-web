import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import flowbiteReact from 'flowbite-react/plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), flowbiteReact()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
})
