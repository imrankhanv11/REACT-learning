import {configureStore} from "@reduxjs/toolkit";
import prouductReducer from "./slices/productSlice"
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
    reducer:{
        ProductsStore: prouductReducer,
        AuthStore: authReducer,
        CartStore: cartReducer,
        OrderStore: orderReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;