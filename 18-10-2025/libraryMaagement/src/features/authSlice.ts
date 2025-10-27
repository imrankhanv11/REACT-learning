import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { loginFormData } from "../schema/loginFormSchema";
import { apiErrorHandlers } from "../api/apiErrorHandlers";
import { publicEndPoints } from "../api/endPoints";
import { api } from "../api/api";
import { tokens } from "../common/enums/tokens";

interface IAuthState {
    accessToken: string,
    refreshToken: string,
}

interface AuthState {
    userDetails: IAuthState | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
}

const initialState: AuthState = {
    userDetails: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk(
    "user/login", async (data: loginFormData, { rejectWithValue }) => {
        try {
            const response = await api.post(publicEndPoints.Login, data);
            localStorage.setItem(tokens.accessToken, response.data.accessToken);
            localStorage.setItem(tokens.refreshToken, response.data.refreshToken);
            return response.data;
        }
        catch (err: any) {
            const error = apiErrorHandlers(err);
            return rejectWithValue(error.message);
        }
    }
)

const authSlice = createSlice({
    reducers: {
        logout: (state) => {
            state.userDetails = null,
                state.error = null,
                state.loading = false;
                state.isAuthenticated = false;
            localStorage.removeItem(tokens.accessToken);
            localStorage.removeItem(tokens.refreshToken);
        }
    },
    initialState,
    name: "auth",
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state) => {
                state.isAuthenticated = true;
            })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;