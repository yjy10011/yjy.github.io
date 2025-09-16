import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:10000,
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json',
    }
})

//请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

//响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response){
            if(error.response.status===401){
                window.location.href = '/'; 
            } else if (error.response.status===500){
                console.error('Server error');
            }
     }
        else if(error.code==='ECONNABORTED'){
            console.error('Request timeout, please try again later');
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;