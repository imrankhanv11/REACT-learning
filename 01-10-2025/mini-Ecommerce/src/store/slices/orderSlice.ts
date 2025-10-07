import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderType, OrderUserType } from "../../types/orderType";

type OrderState = {
    orderList: OrderUserType[];
};

const initialState: OrderState = {
    orderList: [],
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
        },

    },
});

export const { orderItem } = orderSlice.actions;
export default orderSlice.reducer;
