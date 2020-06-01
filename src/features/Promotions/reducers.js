import moment from "moment";

import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "promotions",
  initialState: {
    filters: {
      query: "",
      page: 1,
      size: 25,
      timeStart: moment()
        .year(2019)
        .toISOString(),
      timeEnd: moment()
        .add(10, "y")
        .toISOString(),
      sort: "timeStart",
      sortDesc: true
    },
    //
    promotions: [],
    pagination: {},
    isLoadingPromotions: false,
    isSuccessPromotions: false,
    //
    promotion: {},
    isLoadingPromotion: false,
    isSuccessPromotion: false
  },
  reducers: {
    // Set Promotions
    doGetPromotions: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.promotions = data ? data.promotions : [];
      state.pagination = data ? data.pagination : {};
    },
    doGetPromotion: (state, action) => {
      state.promotion = action.payload;
    },
    // Loading
    setLoadingPromotions: (state, action) => {
      state.isLoadingPromotions = action.payload;
    },
    setLoadingPromotion: (state, action) => {
      state.isLoadingPromotion = action.payload;
    },
    // Success
    setSuccessPromotions: (state, action) => {
      state.isSuccessPromotions = action.payload;
    },
    setSuccessPromotion: (state, action) => {
      state.isSuccessPromotion = action.payload;
    }
  }
});

// Selectors
export const selectPromotionsFilters = state => state.promotions.filters;
export const selectPromotions = {
  promotions: state => state.promotions.promotions,
  pagination: state => state.promotions.pagination,
  isLoadingPromotions: state => state.promotions.isLoadingPromotions,
  isSuccessPromotions: state => state.promotions.isSuccessPromotions
};
export const selectPromotion = {
  promotion: state => state.promotions.promotion,
  isLoadingPromotion: state => state.promotions.isLoadingPromotion,
  isSuccessPromotion: state => state.promotions.isSuccessPromotion
};

export default slice.reducer;
