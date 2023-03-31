import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svgrComponent } from 'vite-plugin-svgr-component'
import { config } from 'dotenv'

config();

// https://vitejs.dev/config/
export default defineConfig ({
    plugins: [svgrComponent(), react()],
    root: 'src',
    build: {
        outDir: '../dist',
        sourcemap: true,
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
    },
    define: {
        API_URL: process.env.API_URL || "http://retro.newbies.pl:3000/api/rest/v1/",
        SOCKET_URL: process.env.SOCKET_URL || "ws://retro.newbies.pl:3001",
    }
})

