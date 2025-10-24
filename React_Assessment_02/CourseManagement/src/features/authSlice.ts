import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { Token } from "../common/enum/token";
import { apiErrorHandlers } from "../apiErrorHandler/apiErrorHandler";
import { PublicEndPoint } from "../api/endPoints";
import api from "../api/api";
import { type RegisterFormData } from "../common/schema/registerFormSchema";
import { type LognFormData } from "../common/schema/loginFromSchema";

export interface LoginUser {
    accessToken: string,
    refreshToken: string,
    expireAt: string
}

export interface AuthState {
    LoginDetails: LoginUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    LoginDetails: null,
    isAuthenticated: !!localStorage.getItem(Token.accessToken),
    loading: false,
    error: null,
};

// User Resgister
export const registerUser = createAsyncThunk(
    "user/register", async (user: RegisterFormData, { rejectWithValue }) => {
        try {
            await api.post(PublicEndPoint.REGISTER, user);
        }
        catch (err: any) {
            const errorResponse = apiErrorHandlers(err);
            return rejectWithValue(errorResponse.message);
        }
    }
)

// User Login
export const loginUser = createAsyncThunk(
    "user/login", async (user: LognFormData, { rejectWithValue }) => {
        try {
            const response = await api.post(PublicEndPoint.LOGIN, user);
            localStorage.setItem(Token.accessToken, response.data.accessToken);
            localStorage.setItem(Token.refreshToken, response.data.refreshToken);
        }
        catch (err: any) {
            const errorResponse = apiErrorHandlers(err);
            return rejectWithValue(errorResponse.message);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.LoginDetails = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem(Token.accessToken);
            localStorage.removeItem(Token.refreshToken);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(loginUser.fulfilled, (state) => {
                state.isAuthenticated = true;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;