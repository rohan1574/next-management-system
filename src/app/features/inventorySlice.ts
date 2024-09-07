// src/features/inventorySlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

interface InventoryState {
  products: Product[];
  notifications: string[];
}

const initialState: InventoryState = {
  products: [],
  notifications: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    checkInventory: (state) => {
      const lowStockNotifications = state.products
        .filter(product => product.quantity < 5) // Adjust threshold as needed
        .map(product => `Low stock for ${product.name}: ${product.quantity} left`);

      state.notifications = lowStockNotifications;
    },
    // Other reducers...
  },
});

export const { addProduct, checkInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
