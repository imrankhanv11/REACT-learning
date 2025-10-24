import { configureStore } from "@reduxjs/toolkit"
import bookReducer from "../features/bookSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import authReducer from '../features/authSlice'

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["userDetails", "isAutheticated"],
};

const authPersisterReducer = persistReducer(authPersistConfig, authReducer);

export const appStore = configureStore({
    reducer: {
        BookStore: bookReducer,
        AuthStore: authPersisterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export const persistor = persistStore(appStore);

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispathStore = typeof appStore.dispatch;