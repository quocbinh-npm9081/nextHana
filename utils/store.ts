import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, shippingReducer } from "./slice";
export const store = configureStore({
  reducer: {
    cartReducer: cartReducer, // reference reducers here
    shippingReducer: shippingReducer,
  },
});

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
