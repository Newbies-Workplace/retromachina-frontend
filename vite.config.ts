import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svgrComponent } from 'vite-plugin-svgr-component'
import { config } from 'dotenv' 

// https://vitejs.dev/config/
export default defineConfig ({
    
    plugins: [svgrComponent(), react()],
    root: 'src',
    server: {
      host: '0.0.0.0',
      port: 8080,
    },  
    define:{
        ...config().parsed
        //API_URL: "'http://localhost:3000/api/rest/v1'" 
      }
      
  })

