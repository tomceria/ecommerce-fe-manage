import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "orderStatuses",
  initialState: {
    // filters: {
    // query: "",
    // page: 1,
    // size: 25,
    // userId: "",
    // verifier: "",
    // sort: "createdAt",
    // sortDesc: true
    // },
    //
    orderStatuses: [],
    // pagination: {},
    isLoadingOrderStatuses: false,
    isSuccessOrderStatuses: false
    //
  },
  reducers: {
    // Set OrderStatuses
    doGetOrderStatuses: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.orderStatuses = data ? data.orderStatuses : [];
      state.pagination = data ? data.pagination : {};
    },
    doGetOrderStatus: (state, action) => {
      state.order = action.payload;
    },
    // Loading
    setLoadingOrderStatuses: (state, action) => {
      state.isLoadingOrderStatuses = action.payload;
    },
    setLoadingOrderStatus: (state, action) => {
      state.isLoadingOrderStatus = action.payload;
    },
    // Is Success
    setSuccessOrderStatuses: (state, action) => {
      state.isSuccessOrderStatuses = action.payload;
    },
    setSuccessOrderStatus: (state, action) => {
      state.isSuccessOrderStatus = action.payload;
    }
  }
});

// Selectors
export const selectOrderStatusesFilters = state => state.orderStatuses.filters;
export const selectOrderStatuses = {
  orderStatuses: state => state.orderStatuses.orderStatuses,
  pagination: state => state.orderStatuses.pagination,
  isLoadingOrderStatuses: state => state.orderStatuses.isLoadingOrderStatuses,
  isSuccessOrderStatuses: state => state.orderStatuses.isSuccessOrderStatuses
};

export default slice.reducer;
