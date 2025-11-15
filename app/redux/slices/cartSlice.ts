import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Item = {
  id: number;
  title: string;
  price: number;
  image?: string;
  qty: number;
};

type CartState = { items: Item[]; total: string };

const initialState: CartState = { items: [], total: "$0.00" };

const calculateTotal = (items: Item[]) =>
  items.reduce((s, i) => s + i.price * i.qty, 0);

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<any>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.qty += 1;
      else state.items.push({ ...action.payload, qty: 1 });
      state.total = `$${calculateTotal(state.items).toFixed(2)}`;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.total = `$${calculateTotal(state.items).toFixed(2)}`;
    },
    updateQty(state, action: PayloadAction<{ id: number; qty: number }>) {
      const it = state.items.find((i) => i.id === action.payload.id);
      if (it) it.qty = action.payload.qty;
      state.total = `$${calculateTotal(state.items).toFixed(2)}`;
    },
    clearCart(state) {
      state.items = [];
      state.total = `$0.00`;
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  slice.actions;
export default slice.reducer;
