import axios, { type InternalAxiosRequestConfig } from "axios"

const api = axios.create({
    baseURL: "https://localhost:7100/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;

// ----- Request Interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config;
},
    (error: any) => {
        return Promise.reject(error);
    }
);


// ----- Response Interceptor
api.interceptors.response.use((response) => response, async (error) => {

    return Promise.reject(error);
})