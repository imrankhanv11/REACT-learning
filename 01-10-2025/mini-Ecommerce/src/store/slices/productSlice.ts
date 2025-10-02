import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type Product } from "../../types/productType";

type ProductState = {
    items: Product[],
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null
}

export const fetchProducts = createAsyncThunk("products/fetch", async () =>{
    const res= await fetch("https://dummyjson.com/products");

    const data = await res.json();
    return data.products;
});

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching products";
      });
  },
});

export default productSlice.reducer;