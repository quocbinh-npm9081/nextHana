import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IInfoProduct } from "./types";
import Cookies from "js-cookie";

//STATES
const initialCartState: any = {
  // cart: { cartItems: [] },
  //parse Json to Obbject
  cart: Cookies.get("cart")
    ? { ...JSON.parse(String(Cookies.get("cart"))).cart }
    : { cartItems: [] },
  shippingWards: Cookies.get("cart")
    ? { ...JSON.parse(String(Cookies.get("cart"))).shippingWards }
    : {},
  paymentMethod: "",
};

// SELECTORS
export const selectCart = (state: RootState) => state.cartReducer;

//SLIDES
export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialCartState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<IInfoProduct>) => {
      const itemIndex: any = state.cart.cartItems.findIndex(
        (product: IInfoProduct) => product.item.slug == action.payload.item.slug
      );

      if (itemIndex != -1) {
        //update quantity order
        state.cart.cartItems[itemIndex].quantity =
          state.cart.cartItems[itemIndex].quantity + action.payload.quantity;

        //update totalPrice
        state.cart.cartItems[itemIndex].totalPrice =
          (state.cart.cartItems[itemIndex].item.price -
            (state.cart.cartItems[itemIndex].item.price *
              state.cart.cartItems[itemIndex].item.sale) /
              100) *
          state.cart.cartItems[itemIndex].quantity;
        //update youSize
        state.cart.cartItems[itemIndex].yourSize = action.payload.yourSize;
        return state;
      } else {
        const newItem = action.payload;
        const cartItems = [...state.cart.cartItems, newItem];

        //add cookie for save cart item
        Cookies.set("cart", JSON.stringify({ ...state, cart: { cartItems } }));

        return {
          ...state,
          cart: { cartItems },
        };
      }
    },
    removeProductInCart: (state, action: PayloadAction<{ slug: string }>) => {
      const itemIndex: any = state.cart.cartItems.findIndex(
        (product: IInfoProduct) => product.item.slug == action.payload.slug
      );
      if (itemIndex != -1) {
        state.cart.cartItems.splice(itemIndex, 1);
        //add cookie for save cart item
        Cookies.set("cart", JSON.stringify({ ...state }));
        return state;
      }
    },
    updateYourSize: (
      state,
      action: PayloadAction<{ slug: string; size: string }>
    ) => {
      const itemIndex: any = state.cart.cartItems.findIndex(
        (product: IInfoProduct) => product.item.slug == action.payload.slug
      );

      if (itemIndex != -1)
        state.cart.cartItems[itemIndex].yourSize = action.payload.size;

      //add cookie for save cart item
      Cookies.set("cart", JSON.stringify({ ...state }));
      return state;
    },
    saveUserInfor(state, action: PayloadAction<any>) {
      const infoDelive = action.payload;
      //add cookie for save shippingWards
      Cookies.set(
        "cart",
        JSON.stringify({
          ...state,
          shippingWards: {
            userInfo: {
              ...infoDelive,
            },
          },
        })
      );
      return {
        ...state,
        shippingWards: {
          userInfo: {
            ...infoDelive,
          },
        },
      };
    },
    saveaPaymentMethod(state, action: PayloadAction<any>) {
      console.log(action);
      return state;
    },
  },
});

// ACTIONS
export const {
  addProductToCart,
  removeProductInCart,
  updateYourSize,
  saveUserInfor,
  saveaPaymentMethod,
} = cartSlice.actions;

//REDUCERS
export const cartReducer = cartSlice.reducer;
