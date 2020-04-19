import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "products",
  initialState: {
    filters: {
      query: "",
      page: 1,
      size: 25,
      brand: "",
      category: "",
      sort: "name",
      sortDesc: false
    },
    //
    products: [],
    pagination: {},
    isLoadingProducts: false,
    isSuccessProducts: false,
    //
    product: {},
    isLoadingProduct: false,
    isSuccessProduct: false
  },
  reducers: {
    // Set Products
    doGetProducts: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.products = data ? data.items : [];
      state.pagination = data ? data.pagination : {};
    },
    doGetProduct: (state, action) => {
      state.product = action.payload.response;
    },
    // Loading
    setLoadingProducts: (state, action) => {
      state.isLoadingProducts = action.payload;
    },
    setLoadingProduct: (state, action) => {
      state.isLoadingProduct = action.payload;
    },
    // Is Success
    setSuccessProducts: (state, action) => {
      state.isSuccessProducts = action.payload;
    },
    setSuccessProduct: (state, action) => {
      state.isSuccessProduct = action.payload;
    }
  }
});

// Selectors
export const selectProductsFilters = state => state.products.filters;
export const selectProducts = {
  products: state => state.products.products,
  pagination: state => state.products.pagination,
  isLoadingProducts: state => state.products.isLoadingProducts,
  isSuccessProducts: state => state.products.isSuccessProducts
};
export const selectProduct = {
  product: state => state.products.product,
  isLoadingProduct: state => state.products.isLoadingProduct,
  isSuccessProduct: state => state.products.isSuccessProduct
};

export default slice.reducer;
