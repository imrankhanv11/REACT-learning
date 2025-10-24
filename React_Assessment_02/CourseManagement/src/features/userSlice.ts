import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../api/api";
import { PrivateEndPoints } from "../api/endPoints";
import { apiErrorHandlers } from "../apiErrorHandler/apiErrorHandler";
import type { UserListType } from "../common/type/userListType";
import type { addUserData } from "../common/schema/addUserSchema";

export const fetchAllUsers = createAsyncThunk(
    "user/getAllUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(PrivateEndPoints.GET_User);
            console.log(response.data);
            return response.data;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addUser = createAsyncThunk(
    "user/addcourse",
    async (data: addUserData, { rejectWithValue }) => {

        const item: {
            name: string,
            email: string,
            dateOfBirth: string,
            phoneNumber: string,
            password: string,
            isActive: boolean,
            isAdmin: boolean
        } = {
            name: data.name,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            phoneNumber: data.phoneNumber,
            password: data.password,
            isActive: data.isActive,
            isAdmin: data.isAdmin === "Admin" ? true : false
        }

        try {
            const response = await api.post(PrivateEndPoints.ADD_User, item);
            return response.data;
        }
        catch (error: any) {
            const errorResponse = apiErrorHandlers(error);
            return rejectWithValue(errorResponse);
        }
    }
)

export const deleteUser = createAsyncThunk(
    "user/delteUser",
    async (id: number, { rejectWithValue }) => {
        try {
            await api.delete(PrivateEndPoints.DELETE_USER(id));
            return id;
        }
        catch (err: any) {
            const responseError = apiErrorHandlers(err);
            return rejectWithValue(responseError);
        }
    }
)

export const updateUser = createAsyncThunk(
    "user/update", async (data: {
        id: number,
        name: string,
        email: string,
        dateOfBirth: string,
        phoneNumber: string,
        password: string,
        isActive: boolean,
        isAdmin: boolean
    }, { rejectWithValue }) => {
    try {

        await api.put(PrivateEndPoints.EDIT_USER, data);
        return data;
    }
    catch (err: any) {
        const responseError = apiErrorHandlers(err);
        return rejectWithValue(responseError);
    }
}
)

interface UserState {
    items: UserListType[],
    loading: boolean,
    error: string | null,
    editItem: UserListType | null
}

const initialState: UserState = {
    items: [],
    loading: false,
    error: null,
    editItem: null
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        ediUser: (state, action: PayloadAction<UserListType>) => {
            state.editItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<UserListType[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action: PayloadAction<UserListType>) => {
                state.items.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter(s => s.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        // builder
        //     .addCase(updateCourse.pending, (state) => {
        //         state.loading = true;
        //         state.error = null;
        //     })
        //     .addCase(updateCourse.fulfilled, (state, action: PayloadAction<{
        //         id: number,
        //         name: string,
        //         durationInMonths: number,
        //         startDate: string,
        //         minimumRequiredAge: number
        //     }>) => {
        //         const index = state.items.findIndex(s => s.name === action.payload.name);

        //         const data: courseListType = {
        //             name: action.payload.name,
        //             durationInMonths: action.payload.durationInMonths,
        //             minimumRequiredAge: action.payload.minimumRequiredAge,
        //             startDate: action.payload.startDate,
        //             createdOn: state.items[index].createdOn,
        //             enrolledUsersCount: state.items[index].enrolledUsersCount,
        //             isEnrolled: state.items[index].isEnrolled,
        //             id: state.items[index].id,
        //         }

        //         if (index !== -1) {
        //             state.items[index] = data;
        //         }
        //     })
        //     .addCase(updateCourse.rejected, (state, action: PayloadAction<any>) => {
        //         state.loading = false;
        //         state.error = action.payload;
        //     });
    }
});

export default UserSlice.reducer;
export const { ediUser } = UserSlice.actions;