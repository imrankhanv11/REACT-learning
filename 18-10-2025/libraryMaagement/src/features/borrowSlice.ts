import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { BorrowType } from "../common/types/borrowType";
import { apiErrorHandlers } from "../api/apiErrorHandlers";
import { api } from "../api/api";
import { privateEndPoints } from "../api/endPoints";

interface BorrowState {
    items: BorrowType[],
    loading: boolean,
    error: string | null
}

const initialState: BorrowState = {
    items: [],
    loading: false,
    error: null
}

export const borrwBook = createAsyncThunk(
    "borrow/book", async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.post(privateEndPoints.BorrowBook(id));
            console.log(response.data);
            return response.data;
        }
        catch (err: any) {
            const error = apiErrorHandlers(err);
            return rejectWithValue(error.message);
        }
    }
)

const borrowSlice = createSlice({
    name: "borrow",
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
        
    // }
});

export default borrowSlice.reducer;