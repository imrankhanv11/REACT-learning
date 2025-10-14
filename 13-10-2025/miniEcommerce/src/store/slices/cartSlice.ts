import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cartType";
import { handleApiError } from "../../errorHandlers/apiErrorHandlers";
import api from "../../api/api";
import { privateEndpoints } from "../../api/enpoints";

export interface CartResponse {
    result: CartItem[],
    totalAmount: number
}

export interface CartState {
    cartItems: CartResponse;
    loading: boolean,
    error: string | null
}

const initialState: CartState = {
    cartItems: {
        result: [],
        totalAmount: 0
    },
    loading: false,
    error: null
}

// Fetch all cart items
export const getAllCartsFetch = createAsyncThunk(
    "carts/getAllCarts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(privateEndpoints.FETCH_ALL_CARTS);
            return response.data;
        } catch (err: any) {
            const handler = handleApiError(err);
            return rejectWithValue(handler);
        }
    }
);

// Add item to cart
export const addToCart = createAsyncThunk(
    "carts/addToCart",
    async ({ productId, quantity }: { productId: number, quantity: number }, { rejectWithValue }) => {
        try {
            const response = await api.post(privateEndpoints.ADD_NEW_CART_PRODUCT, { productId, quantity });
            return response.data;
        } catch (err: any) {
            const handler = handleApiError(err);
            return rejectWithValue(handler);
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch all carts
        builder
            .addCase(getAllCartsFetch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCartsFetch.fulfilled, (state, action: PayloadAction<CartResponse>) => {
                state.cartItems.result = action.payload.result;
                state.cartItems.totalAmount = action.payload.totalAmount;
                state.loading = false;
            })

            .addCase(getAllCartsFetch.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.loading = false;
            });

        // Add to cart
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
                const existingItem = state.cartItems.result.find(
                    item => item.productId === action.payload.productId
                );

                if (existingItem) {
                    // Increase quantity if item already exists
                    existingItem.quantity = action.payload.quantity;
                    existingItem.subTotal = existingItem.price * existingItem.quantity;
                } else {
                    // Add new item
                    state.cartItems.result.push(action.payload);
                }

                // Recalculate total amount
                state.cartItems.totalAmount = state.cartItems.result.reduce(
                    (acc, item) => acc + item.subTotal, 0
                );

                state.loading = false;
            })
            .addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default cartSlice.reducer;
