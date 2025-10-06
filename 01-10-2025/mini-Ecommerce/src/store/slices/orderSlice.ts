import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderType, OrderUserType } from "../../types/orderType";

// --- Local Storage Helpers ---
const loadFromLocalStorage = (): OrderUserType[] => {
    try {
        const data = localStorage.getItem("orders");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const saveToLocalStorage = (orders: OrderUserType[]) => {
    localStorage.setItem("orders", JSON.stringify(orders));
};

// --- Redux State ---
type OrderState = {
    orderList: OrderUserType[];
};

const initialState: OrderState = {
    orderList: loadFromLocalStorage(),
};

// --- Slice ---
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderItem: (state, action: PayloadAction<{ userId: number; orders: OrderType }>) => {
            let userOrder = state.orderList.find(o => o.userId === action.payload.userId);

            if (!userOrder) {
                userOrder = { userId: action.payload.userId, orders: [] };
                state.orderList.push(userOrder);
            }

            userOrder.orders.push(action.payload.orders);

            saveToLocalStorage(state.orderList);
        },

    },
});

// --- Exports ---
export const { orderItem } = orderSlice.actions;
export default orderSlice.reducer;
