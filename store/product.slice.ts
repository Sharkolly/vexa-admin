import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface CartItem {
  _id: string;
  category: string;
  image: string;
  title: string;
  price: number;
  quantity: number | 0;
  new_price?: number;
  slug?: string;
  [key: string]: string | number | boolean | undefined;
}

type TotalType = {
  totalPrice: number;
  totalItems: number;
  overallTotal: number;
  totalDelivery?: number;
};

type ProductState = {
  addToCart: CartItem[];
  total: TotalType;
};

const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") ?? "[]");
const cartTotalItems: TotalType =
  JSON.parse(localStorage.getItem("totalCartItems") ?? "null") || null;

const initialState: ProductState = {
  addToCart: cartItems,
  total: cartTotalItems,
};

const counterSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { title, category, _id, image, price, quantity, slug } = action.payload;

      const new_price = price * quantity;

      state.addToCart.push({
        _id, 
        quantity,
        image,
        title,
        price,
        category,
        new_price,
        slug
      });

          const total: {
        totalPrice: number;
        totalItems: number;
        overallTotal: number;
        totalDelivery: number;
      } = {
        totalPrice: 0,
        totalItems: 0,
        overallTotal: 0,
        totalDelivery: 0,
      };
      state.addToCart.forEach((item) => {
        total.totalPrice += item.new_price || 0;
        total.totalItems += item.quantity;
        total.overallTotal = total.totalPrice + total.totalDelivery;
      });

      state.total = total;
      localStorage.setItem("cart", JSON.stringify(state.addToCart));
      localStorage.setItem("totalCartItems", JSON.stringify(state.total));
    },

    incrementQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const { _id } = action.payload;
      console.log(_id)
      const product = state.addToCart.find(
        (item) => String(item._id) === String(_id),
      );

      if (product) {
        product.quantity += 1;
        product.new_price = product.price * product.quantity;
      }

      const total: {
        totalPrice: number;
        totalItems: number;
        overallTotal: number;
        totalDelivery: number;
      } = {
        totalPrice: 0,
        totalItems: 0,
        overallTotal: 0,
        totalDelivery: 0,
      };
      state.addToCart.forEach((item) => {
        total.totalPrice += item.new_price || 0;
        total.totalItems += item.quantity;
        total.overallTotal = total.totalPrice + total.totalDelivery;
      });

      state.total = total;
      localStorage.setItem("cart", JSON.stringify(state.addToCart));
      localStorage.setItem("totalCartItems", JSON.stringify(state.total));
    },
    decrementQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const { _id } = action.payload;
      const product = state.addToCart.find(
        (item) => String(item._id) === String(_id),
      );

      if (product) {
        product.quantity -= 1;
        if (product.quantity <= 0) product.quantity = 0;
        product.new_price = product.price * product.quantity;
      }

      const total: {
        totalPrice: number;
        totalItems: number;
        overallTotal: number;
        totalDelivery: number;
      } = {
        totalPrice: 0,
        totalItems: 0,
        overallTotal: 0,
        totalDelivery: 0,
      };
      state.addToCart.forEach((item) => {
        total.totalPrice += item.new_price || 0;
        total.totalItems += item.quantity;
        total.overallTotal = total.totalPrice + total.totalDelivery;
      });

      state.total = total;
      localStorage.setItem("cart", JSON.stringify(state.addToCart));
      localStorage.setItem("totalCartItems", JSON.stringify(state.total));
    },
    removeCart: (state, action: PayloadAction<{ _id: string }>) => {
      const { _id } = action.payload;
      state.addToCart = state.addToCart.filter((item) => item._id !== _id);
           const total: {
        totalPrice: number;
        totalItems: number;
        overallTotal: number;
        totalDelivery: number;
      } = {
        totalPrice: 0,
        totalItems: 0,
        overallTotal: 0,
        totalDelivery: 0,
      };
      state.addToCart.forEach((item) => {
        total.totalPrice += item.new_price || 0;
        total.totalItems += item.quantity;
        total.overallTotal = total.totalPrice + total.totalDelivery;
      });

      state.total = total;
      localStorage.setItem("cart", JSON.stringify(state.addToCart));
      localStorage.setItem("totalCartItems", JSON.stringify(state.total));
    },
  },
});

export const { addToCart, removeCart, incrementQuantity, decrementQuantity } =
  counterSlice.actions;

export default counterSlice.reducer;
