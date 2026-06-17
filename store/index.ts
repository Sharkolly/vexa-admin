import { configureStore } from "@reduxjs/toolkit";
import Product from "../store/product.slice";

export const store = configureStore({
  reducer: {
    product: Product,
    // cart: cartReducer,
  },
  
});

// TYPES (important) turnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
