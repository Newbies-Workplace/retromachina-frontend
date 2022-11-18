import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svgrComponent } from 'vite-plugin-svgr-component'
import { config } from 'dotenv'

config();

// https://vitejs.dev/config/
export default defineConfig ({
    plugins: [svgrComponent(), react()],
    root: 'src',
    server: {
        host: '0.0.0.0',
        port: 8080,
    },
    define:{
        API_URL: process.env.API_URL,
        SOCKET_URL: process.env.SOCKET_URL
    }
})

