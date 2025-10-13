import axios, { type InternalAxiosRequestConfig } from "axios";
import { publicEndpoints } from "./enpoints";

const api = axios.create({
    baseURL: "https://localhost:7263/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// -------- REQUEST INTERCEPTOR --------
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

        const isPublic = Object.values(publicEndpoints).some((url) =>
            config.url?.includes(url)
        );

        if (!isPublic) {
            const token = localStorage.getItem("access_token");
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {

            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const response = await axios.post(
                    "https://localhost:7263/api/Authentication/RefreshToken",
                    refreshToken,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );

                const newAccessToken = response.data.accessToken;
                const newRefreshToken = response.data.refreshToken;


                if (!newAccessToken || !newRefreshToken) {
                    throw new Error("Invalid token response from server");
                }

                localStorage.setItem("access_token", newAccessToken);
                localStorage.setItem("refresh_token", newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (err: any) {
                console.error("Refresh token failed:", err);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


export default api;