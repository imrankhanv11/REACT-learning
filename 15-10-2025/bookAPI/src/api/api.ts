import axios, { type InternalAxiosRequestConfig } from "axios"
import { publicEndPoints } from "./endPoints";
import { token } from "../commons/enums/TokenStorage";

const api = axios.create({
    baseURL: "https://localhost:7281/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;

// ----- Request Interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {

    const isPublicEndpoint = Object.values(publicEndPoints).some((urlValues) => {
        config.url?.includes(urlValues);
    });

    if (!isPublicEndpoint) {
        const accessToken = localStorage.getItem(token.accessTokenLC);
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
},
    (error: any) => {
        return Promise.reject(error);
    }
);


// ----- Response Interceptor
api.interceptors.response.use((response) => response, async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && originalRequest) {
        originalRequest._retry = true;

        try {

            const refresh_token = localStorage.getItem(token.refreshTokenLC);
            if (!refresh_token) {
                throw new Error("No refresh token Available");
            }

            const response = await axios.post("https://localhost:7281/api/Login/RefreshToken", refresh_token, {
                headers: { "Content-Type": "application/json" }
            });

            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;

            if (!newAccessToken || !newRefreshToken) {
                throw new Error("Invalid token");
            }

            localStorage.setItem(token.accessTokenLC, newAccessToken);
            localStorage.setItem(token.refreshTokenLC, newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);

        }
        catch (err: any) {
            localStorage.removeItem(token.accessTokenLC);
            localStorage.removeItem(token.refreshTokenLC);
            return Promise.reject(err);
        }
    }

    return Promise.reject(error);
})