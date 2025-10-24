import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserDetailsType } from "../commons/types/userType";
import { loginUser } from "../api/apiService";
import { token } from "../commons/enums/TokenStorage";

export const loginUserAsync = createAsyncThunk(
    "auth/login",
    async (user: { userName: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await loginUser(user);

            localStorage.setItem(token.accessTokenLC, response.accessToken);
            localStorage.setItem(token.refreshTokenLC, response.refreshToken);

            return response.user;
        }
        catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

interface AuthState {
    userDetails: UserDetailsType | null;
    isAutheticated: boolean;
    loading: boolean;
    error: string | null;
};

export const initialState: AuthState = {
    userDetails: null,
    isAutheticated: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.userDetails = null;
            state.isAutheticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem(token.accessTokenLC);
            localStorage.removeItem(token.refreshTokenLC);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action: PayloadAction<UserDetailsType>) => {
                state.loading = false;
                state.isAutheticated = true;
                state.userDetails = action.payload;
            })
            .addCase(loginUserAsync.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;