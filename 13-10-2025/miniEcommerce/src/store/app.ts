import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "./slices/productSlices";
import authSlice from "./slices/authSlice";
import cartSlice from './slices/cartSlice';

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["userDetails", "isAuthenticated"],
};



const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

export const appStore = configureStore({
    reducer: {
        ProductStore: productSlice,
        AuthStore: persistedAuthReducer,
        CartStore: cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(appStore);

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispath = typeof appStore.dispatch;