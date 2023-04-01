import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import { svgrComponent } from 'vite-plugin-svgr-component'
import { config } from 'dotenv'

config();

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd(), 'RETRO_')};

    return defineConfig({
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
            API_URL: process.env.RETRO_API_URL,
            SOCKET_URL: process.env.RETRO_SOCKET_URL,
        }
    })
}
