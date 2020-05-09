import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "inventory",
  initialState: {
    filters: {
      query: "",
      page: 1,
      size: 25,
      itemId: "",
      sort: "createdAt",
      sortDesc: true
    },
    //
    inventoryItems: [],
    pagination: {},
    isLoadingInventoryItems: false,
    isSuccessInventoryItems: false,
    //
    inventoryItem: {},
    isLoadingInventoryItem: false,
    isSuccessInventoryItem: false
  },
  reducers: {
    // Set InventoryItems
    doGetInventoryItems: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.inventoryItems = data ? data.inventories : [];
      state.pagination = data ? data.pagination : {};
    },
    doGetInventoryItem: (state, action) => {
      state.inventoryItem = action.payload;
    },
    // Loading
    setLoadingInventoryItems: (state, action) => {
      state.isLoadingInventoryItems = action.payload;
    },
    setLoadingInventoryItem: (state, action) => {
      state.isLoadingInventoryItem = action.payload;
    },
    // Is Success
    setSuccessInventoryItems: (state, action) => {
      state.isSuccessInventoryItems = action.payload;
    },
    setSuccessInventoryItem: (state, action) => {
      state.isSuccessInventoryItem = action.payload;
    }
  }
});

// Selectors
export const selectInventoryItemsFilters = state => state.inventory.filters;
export const selectInventoryItems = {
  inventoryItems: state => state.inventory.inventoryItems,
  pagination: state => state.inventory.pagination,
  isLoadingInventoryItems: state => state.inventory.isLoadingInventoryItems,
  isSuccessInventoryItems: state => state.inventory.isSuccessInventoryItems
};
export const selectInventoryItem = {
  inventoryItem: state => state.inventory.inventoryItem,
  isLoadingInventoryItem: state => state.inventory.isLoadingInventoryItem,
  isSuccessInventoryItem: state => state.inventory.isSuccessInventoryItem
};

export default slice.reducer;
