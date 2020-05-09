import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    isLoadingBrands: false,
    isSuccessBrands: false,
    //
    brand: {},
    isLoadingBrand: false,
    isSuccessBrand: false
  },
  reducers: {
    // Set Brands
    doGetBrands: (state, action) => {
      // state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.brands = data ? data.brands : [];
      // state.pagination = data ? data.pagination : {};
    },
    doGetBrand: (state, action) => {
      state.brand = action.payload;
    },
    // Loading
    setLoadingBrands: (state, action) => {
      state.isLoadingBrands = action.payload;
    },
    setLoadingBrand: (state, action) => {
      state.isLoadingBrand = action.payload;
    },
    // Success
    setSuccessBrands: (state, action) => {
      state.isSuccessBrands = action.payload;
    },
    setSuccessBrand: (state, action) => {
      state.isSuccessBrand = action.payload;
    }
  }
});

// Selectors
export const selectBrands = {
  brands: state => state.brands.brands,
  isLoadingBrands: state => state.brands.isLoadingBrands,
  isSuccessBrands: state => state.brands.isSuccessBrands
};
export const selectBrand = {
  brand: state => state.brands.brand,
  isLoadingBrand: state => state.brands.isLoadingBrand,
  isSuccessBrand: state => state.brands.isSuccessBrand
};

export default slice.reducer;
