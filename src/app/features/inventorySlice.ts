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
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    checkInventory: (state) => {
      state.notifications = state.products
        .filter(product => product.quantity <= 5) // Example threshold for low stock
        .map(product => `Low stock for product: ${product.name}`);
    }
  },
});

export const { addProduct, updateProduct, deleteProduct, checkInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
