import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slice";
export const store = configureStore({
  reducer: {
    cartReducer: cartReducer, // reference reducers here
  },
});

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
