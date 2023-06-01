import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  current,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IInfoProduct, IInfoCart } from "./types";
import Cookies from "js-cookie";

//STATES
const initialCartState: any = {
  loading: false,

  //parse Json to Obbject
  cart: Cookies.get("cart")
    ? { ...JSON.parse(String(Cookies.get("cart"))).cart }
    : { cartItems: [], totalCost: 0 },
  shippingWards: Cookies.get("cart")
    ? { ...JSON.parse(String(Cookies.get("cart"))).shippingWards }
    : {
        tabActive: 0,
        userInfo: {},
        paymentMethod: "",
      },
};
interface IPayloadMutilple {
  type?: string;
  data: any;
}
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
        //update youSize and yourColor
        state.cart.cartItems[itemIndex].yourSize = action.payload.yourSize;
        state.cart.cartItems[itemIndex].yourColor = action.payload.yourColor;
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
      // return state;
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
    updateYourColor: (
      state,
      action: PayloadAction<{ slug: string; color: string }>
    ) => {
      const itemIndex: any = state.cart.cartItems.findIndex(
        (product: IInfoProduct) => product.item.slug == action.payload.slug
      );

      if (itemIndex != -1)
        state.cart.cartItems[itemIndex].yourColor = action.payload.color;

      //add cookie for save cart item
      Cookies.set("cart", JSON.stringify({ ...state }));
      return state;
    },
    saveUserInfor(state, action: PayloadAction<any>) {
      const infoDelive = action.payload;
      const { shippingWards } = state;

      //add cookie for save shippingWards
      Cookies.set(
        "cart",
        JSON.stringify({
          ...state,
          shippingWards: {
            ...shippingWards,
            userInfo: {
              ...infoDelive,
            },
          },
        })
      );
      return {
        ...state,
        shippingWards: {
          ...shippingWards,
          userInfo: {
            ...infoDelive,
          },
        },
      };
    },
    savePaymentMethod(state, action: PayloadAction<any>) {
      const paymentMethod: string =
        action.payload.data.method.hana_paymentMethod;
      const { shippingWards } = state;

      Cookies.set(
        "cart",
        JSON.stringify({
          ...state,
          shippingWards: {
            ...shippingWards,
            paymentMethod: paymentMethod,
          },
        })
      );
      return {
        ...state,
        shippingWards: {
          ...shippingWards,
          paymentMethod: paymentMethod,
        },
      };
    },
    changeTabGroupShipping(state, action: PayloadAction<any>) {
      const tabActive: number = action.payload;
      const { shippingWards } = state;

      Cookies.set(
        "cart",
        JSON.stringify({
          ...state,
          shippingWards: {
            ...shippingWards,
            tabActive: tabActive,
          },
        })
      );
      return {
        ...state,
        shippingWards: {
          ...shippingWards,
          tabActive: tabActive,
        },
      };
    },
    calTotalPrice(state, action: PayloadAction<any>) {
      const totalCost = action.payload;
      const { cartItems } = state.cart;
      Cookies.set(
        "cart",
        JSON.stringify({ ...state, cart: { cartItems, totalCost: totalCost } })
      );

      return {
        ...state,
        cart: { cartItems, totalCost: totalCost },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveInfoAndChangeTabShipping.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveInfoAndChangeTabShipping.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToCartAndCalTotalCost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAndCalTotalCost.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

//MUlTIPLE ACTION
//save info and change tab shipping
export const saveInfoAndChangeTabShipping = createAsyncThunk(
  "users/saveInfoAndChangeTabShipping",
  async (payload: IPayloadMutilple, { dispatch }) => {
    switch (String(payload.type)) {
      case "SAVE_USER_INFO":
        dispatch(
          saveUserInfor({
            name: payload.data.user.hana_name,
            phoneNumber: payload.data.user.hana_phoneNumber,
            address: payload.data.user.hana_address,
            province: payload.data.user.hana_proviincee,
            district: payload.data.user.hana_district,
            ward: payload.data.user.hana_ward,
          })
        );
        dispatch(changeTabGroupShipping(payload.data.index));
        break;
      case "SAVE_PAYMENT_METHOD":
        dispatch(savePaymentMethod(payload));
        dispatch(changeTabGroupShipping(payload.data.index));
        break;
      default:
        break;
    }
  }
);

export const addToCartAndCalTotalCost = createAsyncThunk(
  "users/addToCartAndCalTotalCost",
  async (payload: IPayloadMutilple, { dispatch }) => {
    dispatch(addProductToCart(payload.data.item));
    dispatch(calTotalPrice(payload.data.totalPrice));
  }
);

// ACTIONS
export const {
  addProductToCart,
  removeProductInCart,
  updateYourSize,
  updateYourColor,
  saveUserInfor,
  savePaymentMethod,
  changeTabGroupShipping,
  calTotalPrice,
} = cartSlice.actions;

//REDUCERS
export const cartReducer = cartSlice.reducer;
