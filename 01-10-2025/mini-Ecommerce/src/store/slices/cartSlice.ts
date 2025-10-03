import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { userCart, CartItem } from "../../types/cartType";

// Load from localStorage
const loadFromLocalStorage = (): userCart[] => {
    try {
        const data = localStorage.getItem("cart");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

// Save to localStorage
const saveToLocalStorage = (cartState: userCart[]) => {
    localStorage.setItem("cart", JSON.stringify(cartState));
};

type CartState = {
    cartList: userCart[];
};

const initialState: CartState = {
    cartList: loadFromLocalStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{ userId: number; item: CartItem }>
        ) => {
            let userCart = state.cartList.find(c => c.userId === action.payload.userId);

            if (!userCart) {
                userCart = { userId: action.payload.userId, cart: [] };
                state.cartList.push(userCart);
            }

            const existing = userCart.cart.find(
                ci => ci.productId === action.payload.item.productId
            );

            if (!existing) {
                userCart.cart.push(action.payload.item);
            }

            saveToLocalStorage(state.cartList);
        },

        updateQuantity: (
            state,
            action: PayloadAction<{ userId: number; productId: number; quantity: number }>
        ) => {
            const userCart = state.cartList.find(c => c.userId === action.payload.userId);
            if (userCart) {
                const item = userCart.cart.find(ci => ci.productId === action.payload.productId);
                if (item) item.quantity = action.payload.quantity;
            }
            saveToLocalStorage(state.cartList);
        },

        removeFromCart: (
            state,
            action: PayloadAction<{ userId: number; productId: number }>
        ) => {
            const userCart = state.cartList.find(c => c.userId === action.payload.userId);
            if (userCart) {
                userCart.cart = userCart.cart.filter(ci => ci.productId !== action.payload.productId);
            }
            saveToLocalStorage(state.cartList);
        },

        clearCart: (state, action: PayloadAction<{ userId: number }>) => {
            const userCart = state.cartList.find(c => c.userId === action.payload.userId);
            if (userCart) {
                userCart.cart = [];
            }
            saveToLocalStorage(state.cartList);
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
