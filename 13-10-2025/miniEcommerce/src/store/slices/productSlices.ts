import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import type { ProductType } from "../../types/productType";
import { handleApiError } from "../../errorHandlers/apiErrorHandlers";
import { privateEndpoints } from "../../api/enpoints";
import type { productAddType } from "../../types/productAddType";
import { addNewProductsMethod, getAllProducts } from "../../api/apiService";

export const fetchAllProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllProducts();
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNewProducts = createAsyncThunk(
    "products/addNewProducts",
    async (data: productAddType, { rejectWithValue }) => {
        try {
            const response = await addNewProductsMethod(data);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

// ---
export const updateQuantity = createAsyncThunk(
    "products/updateQuantityProduct",
    async ({ id, quantity }: { id: number; quantity: number }, { rejectWithValue }) => {
        try {
            await api.patch(privateEndpoints.UPDATE_PROUDCT_QUANTITY(id), { Qunatity: quantity });
            return { id, quantity };
        } catch (err: any) {
            const handlerError = handleApiError(err);
            return rejectWithValue(handlerError.message);
        }
    }
);

interface ProductState {
    items: ProductType[],
    loading: boolean,
    error: string | null
}

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null
}

const prouducstSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        increaseProductQuantity: (state, action: PayloadAction<{ id: number, quanitity: number }>) => {
            const exiting = state.items.find(s => s.productId === action.payload.id);
            if (exiting) {
                exiting.stock += action.payload.quanitity;
            }
        },
        decreseProductQuantity: (state, action: PayloadAction<{ id: number }>) => {
            const existingItem = state.items.find(s => s.productId === action.payload.id);
            if (existingItem) {
                existingItem.stock -= 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(addNewProducts.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(addNewProducts.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addNewProducts.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(updateQuantity.fulfilled, (state, action: PayloadAction<{ id: number, quantity: number }>) => {
                const { id, quantity } = action.payload;

                const exiting = state.items.find(p => p.productId === id);
                if (exiting) {
                    exiting.stock += quantity;
                }
            })
    }
});

export default prouducstSlice.reducer;
export const { clearError, increaseProductQuantity, decreseProductQuantity } = prouducstSlice.actions;