import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { svgrComponent } from 'vite-plugin-svgr-component'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgrComponent(),react()]
})
