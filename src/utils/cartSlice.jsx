import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.card.info.id === newItem.card.info.id
      );

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it with a quantity of 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.card.info.id !== action.payload
      );
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.card.info.id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.card.info.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // If quantity is 1, remove the item
        state.items = state.items.filter(
          (item) => item.card.info.id !== action.payload
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItems,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
