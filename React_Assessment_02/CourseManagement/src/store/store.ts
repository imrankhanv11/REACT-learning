import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from '../features/authSlice'
import courseReducer from '../features/courseSlice'
import userReducer from '../features/userSlice'

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["isAuthenticated"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const appStore = configureStore({
    reducer: {
        AuthStore: persistedAuthReducer,
        CouseStore: courseReducer,
        UserStore: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootStateStore = ReturnType<typeof appStore.getState>;
export type AppDispathStore = typeof appStore.dispatch;

export const persistor = persistStore(appStore);
