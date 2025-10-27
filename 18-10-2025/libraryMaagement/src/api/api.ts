import axios from "axios"
import { type InternalAxiosRequestConfig } from "axios";
import { publicEndPoints } from "./endPoints";
import { tokens } from "../common/enums/tokens";
// import { store } from "../store/store";

export const api = axios.create({
    baseURL: `https://localhost:7115/api`,
    headers: {
        "Content-Type": "application/json"
    }
});


//Request 
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

        const isPublic: boolean = Object.values(publicEndPoints).some((url) =>
            config.url?.includes(url)
        );

        if (!isPublic) {
            const token = localStorage.getItem(tokens.accessToken);
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem(tokens.refreshToken);
                if (!refreshToken) throw new Error("No refresh token available");

                const response = await axios.post(
                    "https://localhost:7115/api/Account/user/refreshtoken",
                    { token: refreshToken }
                );

                const newAccessToken = response.data.accessToken;
                const newRefreshToken = response.data.refreshToken;

                if (!newAccessToken || !newRefreshToken)
                    throw new Error("Invalid token response from server");

                

                localStorage.setItem(tokens.accessToken, newAccessToken);
                localStorage.setItem(tokens.refreshToken, newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                console.error("Refresh token failed:", err);
                localStorage.removeItem(tokens.accessToken);
                localStorage.removeItem(tokens.refreshToken);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
)
