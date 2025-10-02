import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/userType";

type AuthState = {
    user: User | null;
};

const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerUser: (state, action: PayloadAction<Omit<User, "id">>) => {
            const users: User[] = JSON.parse(localStorage.getItem("userList") || "[]");

            const newUser: User = { id: Date.now(), ...action.payload };

            users.push(newUser);
            localStorage.setItem("userList", JSON.stringify(users));

            state.user = newUser;
            localStorage.setItem("user", JSON.stringify(newUser));
        },
        loginUser: (state, action: PayloadAction<{ email: string, password: string }>) => {
            const users: User[] = JSON.parse(localStorage.getItem("userList") || "[]");

            const userFound = users.find(
                (u) => u.email === action.payload.email && u.password === action.payload.password
            );

            if (userFound) {
                state.user = userFound;
                localStorage.setItem("user", JSON.stringify(userFound));
            }
            else {
                state.user = null;
            }
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    },
});

export default authSlice.reducer;
export const { registerUser, loginUser, logoutUser } = authSlice.actions;