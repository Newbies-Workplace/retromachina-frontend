import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import { svgrComponent } from 'vite-plugin-svgr-component'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'RETRO_')

    return {
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
            API_URL: env.RETRO_API_URL,
            SOCKET_URL: env.RETRO_SOCKET_URL,
        }
    }
})
