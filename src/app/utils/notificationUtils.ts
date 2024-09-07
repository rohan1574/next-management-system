// src/app/utils/notificationUtils.ts

import { AppDispatch } from '../store/store';
import { checkInventory } from '../features/inventorySlice';

export const notifyLowStock = (dispatch: AppDispatch) => {
  dispatch(checkInventory());
};
