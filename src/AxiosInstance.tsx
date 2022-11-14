import axios from 'axios'


const token = localStorage.getItem('Bearer')

export const axiosInstance = axios.create({
            // @ts-ignore
            baseURL: API_URL,
            timeout: 5000,
            headers: {
                "Authorization": "Bearer " + token
            }
        }); 
    


