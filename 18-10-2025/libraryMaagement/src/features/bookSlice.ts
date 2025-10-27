import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookType } from "../common/types/bookType";
import { apiErrorHandlers } from "../api/apiErrorHandlers";
import { api } from "../api/api";
import { privateEndPoints, publicEndPoints } from "../api/endPoints";

export const fetchAllBooks = createAsyncThunk(
    "books/fetchAll", async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(publicEndPoints.FetchAllBooks);
            return response.data;
        }
        catch (err: any) {
            const error = apiErrorHandlers(err);
            return rejectWithValue(error.message);
        }
    }
)

export const addNewBook = createAsyncThunk(
    "books/addBook", async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await api.post(privateEndPoints.AddBook, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            // console.log(response.data);

            return response.data;
        }
        catch (err: any) {
            const error = apiErrorHandlers(err);
            return rejectWithValue(error.message);
        }
    }
);

export const deleteBook = createAsyncThunk(
    "books/deleteBook", async (id: number, { rejectWithValue }) => {
        try {
            const response = await api.delete(privateEndPoints.DeleteBook(id));
            return response.data;
        }
        catch (err: any) {
            const error = apiErrorHandlers(err);
            return rejectWithValue(error.message);
        }
    }
)

export const UpdateBook = createAsyncThunk(
    "books/update", async ({ id, data }: { id: number, data: FormData }, { rejectWithValue }) => {
        try {
            const response = await api.put(privateEndPoints.UpdateBook(id), data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            // console.log(response.data);
            return response.data;
        }
        catch (err: any) {
            const error = apiErrorHandlers(err);
            return rejectWithValue(error.message);
        }
    }
)

interface IBookState {
    items: BookType[],
    loading: boolean,
    error: string | null,
    editItem: BookType | null
};

const initialState: IBookState = {
    items: [],
    loading: false,
    error: null,
    editItem: null
};

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        editBookItem: (state, action: PayloadAction<BookType>) => {
            state.editItem = action.payload;
        },
        removeEditBookItem: (state) => {
            state.editItem = null;
        },
        clearError : (state) =>{
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBooks.pending, (state) => {
                state.error = null,
                    state.loading = true;
            })
            .addCase(fetchAllBooks.fulfilled, (state, action: PayloadAction<BookType[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllBooks.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(addNewBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewBook.fulfilled, (state, action: PayloadAction<BookType>) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addNewBook.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(deleteBook.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
                state.items = state.items.filter(s => s.id !== action.payload.id);
            });

        builder
            .addCase(UpdateBook.fulfilled, (state, action: PayloadAction<BookType>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

    }
});

export default bookSlice.reducer;
export const { removeEditBookItem, editBookItem, clearError } = bookSlice.actions;