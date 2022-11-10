import axios from 'axios'
        
const requestValue = localStorage.getItem('Bearer');
export const axiosInstance = axios.create({
            baseURL: 'http://localhost:3000/api/rest/v1/',
            timeout: 5000,
            headers: {"Authorization" : "Bearer " + requestValue}
        }); 
    


