import axios from 'axios'
        
export const axiosInstance = axios.create({
            baseURL: 'http://localhost:3000/api/rest/v1/',
            timeout: 5000,
        }); 
    


