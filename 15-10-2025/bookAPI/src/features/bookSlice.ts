import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { bookType } from "../commons/types/bookType";
import { addBook, deleteBook, fetchAllBooks } from "../api/apiService";

export const fetchAllBooksMethod = createAsyncThunk(
    "books/getAll", async (_, { rejectWithValue }) => {
        try {
            return await fetchAllBooks();
        }
        catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteBookMethod = createAsyncThunk(
    "books/delete", async (id: number, { rejectWithValue }) => {
        try {
            return await deleteBook(id);
        }
        catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const addBookMethod = createAsyncThunk(
    "books/addBook", async (book: {
        title: string,
        author: string,
        price: number,
        stock: number,
        categoryId: number
    }, { rejectWithValue }) => {
    try {
        return await addBook(book);
    }
    catch (err: any) {
        return rejectWithValue(err.message);
    }
})

interface BookState {
    items: bookType[],
    loading: boolean,
    error: string | null,
    editBook: bookType | null
};

const initialState: BookState = {
    items: [],
    loading: false,
    error: null,
    editBook: null
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        editBook: (state, action: PayloadAction<bookType | null>) => {
            state.editBook = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBooksMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllBooksMethod.fulfilled, (state, action: PayloadAction<bookType[]>) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchAllBooksMethod.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(deleteBookMethod.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBookMethod.fulfilled, (state, action: PayloadAction<any>) => {
                console.log("delete");
                state.loading = false;
                state.items = state.items.filter(s => s.bookId != action.payload.id);
            })
            .addCase(deleteBookMethod.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(addBookMethod.fulfilled, (state, action: PayloadAction<bookType>) => {
                console.log("added");
                state.items.push(action.payload);
            })
    }
});

export default bookSlice.reducer;

export const { editBook } = bookSlice.actions;