import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import { handleApiError } from "../../errorHandlers/apiErrorHandlers";
import { publicEndpoints } from "../../api/enpoints";

export interface UserDetails {
    userId: number;
    name: string;
    email: string;
    role: "User" | "Admin",
    createdAt: string;
}

export interface AuthState {
    userDetails: UserDetails | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    userDetails: null,
    isAuthenticated: !!localStorage.getItem("access_token"),
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (
        credentials: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.post(publicEndpoints.LOGIN, credentials);
            // Save tokens in localStorage
            localStorage.setItem("access_token", response.data.accessToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);

            return response.data.user;
        } catch (err: any) {
            const errorValues = handleApiError(err);
            return rejectWithValue(errorValues.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.userDetails = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserDetails>) => {
                state.loading = false;
                state.userDetails = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;