import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svgrComponent } from 'vite-plugin-svgr-component'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgrComponent(), react()],
  root: 'src',
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  define: {
    "__API_URL__": "'http://retro.newbies.pl:3000/api'"
  }
})
