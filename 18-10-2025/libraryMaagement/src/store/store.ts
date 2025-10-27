import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import bookReducer from "../features/bookSlice"
import borrowReducer from "../features/bookSlice"

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["isAuthenticated"],
};

const authPersisterReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        AuthStore: authPersisterReducer,
        BookStore: bookReducer,
        BorrowStore: borrowReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export const persistor = persistStore(store);

export type RootStateStore = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;