import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "orders",
  initialState: {
    filters: {
      query: "",
      page: 1,
      size: 25,
      userId: "",
      verifier: "",
      statusId: "",
      sort: "createdAt",
      sortDesc: true
    },
    //
    orders: [],
    pagination: {},
    isLoadingOrders: false,
    isSuccessOrders: false,
    //
    order: {},
    isLoadingOrder: false,
    isSuccessOrder: false
  },
  reducers: {
    // Set Orders
    doGetOrders: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.orders = data ? data.orders : [];
      state.pagination = data ? data.pagination : {};
    },
    doGetOrder: (state, action) => {
      state.order = action.payload;
    },
    // Loading
    setLoadingOrders: (state, action) => {
      state.isLoadingOrders = action.payload;
    },
    setLoadingOrder: (state, action) => {
      state.isLoadingOrder = action.payload;
    },
    // Is Success
    setSuccessOrders: (state, action) => {
      state.isSuccessOrders = action.payload;
    },
    setSuccessOrder: (state, action) => {
      state.isSuccessOrder = action.payload;
    }
  }
});

// Selectors
export const selectOrdersFilters = state => state.orders.filters;
export const selectOrders = {
  orders: state => state.orders.orders,
  pagination: state => state.orders.pagination,
  isLoadingOrders: state => state.orders.isLoadingOrders,
  isSuccessOrders: state => state.orders.isSuccessOrders
};
export const selectOrder = {
  order: state => state.orders.order,
  isLoadingOrder: state => state.orders.isLoadingOrder,
  isSuccessOrder: state => state.orders.isSuccessOrder
};

export default slice.reducer;
