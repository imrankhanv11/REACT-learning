import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist"

import prouductReducer from "./slices/productSlice"
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice";

const authPersistConfig = {
    key: "auth",
    storage,
}

const cartPersistsConfig = {
    key: "cart",
    storage,
}

const orderPersistsConfig = {
    key: "order",
    storage
}

// combine reducers
const rootReducer = combineReducers({
    ProductsStore: prouductReducer,
    AuthStore: persistReducer(authPersistConfig, authReducer),
    CartStore: persistReducer(cartPersistsConfig, cartReducer),
    OrderStore: persistReducer(orderPersistsConfig, orderReducer)
});

const mainPersistsReducer = persistReducer(
    {
        key: "root",
        storage,
        blacklist: ["ProductsStore"],
        whitelist: ["AuthStore","CartStore","OrderStore"],
    },
    rootReducer
);

export const store = configureStore({
    reducer: mainPersistsReducer,
    middleware: (getDefault) =>
        getDefault({
            serializableCheck: false,
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;