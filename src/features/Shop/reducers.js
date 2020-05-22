import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "shop",
  initialState: {
    //
    shop: {},
    isLoadingShop: false,
    isSuccessShop: false
  },
  reducers: {
    doGetShop: (state, action) => {
      state.shop = action.payload;
    },
    setLoadingShop: (state, action) => {
      state.isLoadingShop = action.payload;
    },
    setSuccessShop: (state, action) => {
      state.isSuccessShop = action.payload;
    }
  }
});

// Selectors
export const selectShop = {
  shop: state => state.shop.shop,
  isLoadingShop: state => state.shop.isLoadingShop,
  isSuccessShop: state => state.shop.isSuccessShop
};

export default slice.reducer;
