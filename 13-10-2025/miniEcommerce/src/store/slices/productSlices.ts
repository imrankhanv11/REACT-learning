import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import type { ProductType } from "../../types/productType";
import { handleApiError } from "../../errorHandlers/apiErrorHandlers";
import { privateEndpoints, publicEndpoints } from "../../api/enpoints";
import type { productAddType } from "../../types/productAddType";

export const fetchAllProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(publicEndpoints.FETCH_ALL_PRODUCTS);
            return response.data;
        }
        catch (error: any) {
            const handlerError = handleApiError(error);
            return rejectWithValue(handlerError.message);
        }
    }
);

export const addNewProducts = createAsyncThunk(
    "products/addNewProducts",
    async (data: productAddType, { rejectWithValue }) => {
        try {
            const response = await api.post(privateEndpoints.ADD_NEW_PRODUCT, data);
            return response.data.product;
        }
        catch (error: any) {
            const handlerError = handleApiError(error);
            return rejectWithValue(handlerError.message);
        }
    }
)

export const updateQuantity = createAsyncThunk(
    "products/updateQuantityProduct",
    async ({ id, quantity }: { id: number; quantity: number }, { rejectWithValue }) => {
        try {
            // Send `Qunatity` to match the DTO
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
    reducers: {},
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