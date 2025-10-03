import {configureStore} from "@reduxjs/toolkit";
import prouductReducer from "./slices/productSlice"
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"

export const store = configureStore({
    reducer:{
        ProductsStore: prouductReducer,
        AuthStore: authReducer,
        CartStore: cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;