import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
  qty?: number; // qty est facultatif car il n'est pas présent dans toutes les données de produit
}

interface cartState {
  cartItems: IProduct[];
  shippingAddress: {};
  paymentMethod: string;
}

const initialState: cartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "{}")
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Paypal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) => {
          return x._id === existItem._id ? item : x;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeToCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action: PayloadAction<string>) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action: PayloadAction<any>) => {
      state.cartItems = [];
      return updateCart(state);
    },
    resetCart: (state, action: PayloadAction<void>) => {
      state = initialState;
    },
  },
});

export const {
  addToCart,
  removeToCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
