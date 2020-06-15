import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "products",
  initialState: {
    filters: {
      query: "",
      page: 1,
      size: 25,
      scale: "",
      type: "",
      maker: "",
      brand: "",
      variationName: "",
      sort: "createdAt",
      sortDesc: true
    },
    //
    products: [],
    pagination: {},
    isLoadingProducts: false,
    isSuccessProducts: false,
    //
    product: {},
    isLoadingProduct: false,
    isSuccessProduct: false,
    //
    filterValues: {},
    variations: [],
    isLoadingFilterValues: false,
    isSuccessFilterValues: false
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
      state.product = action.payload;
    },
    doGetFilterValues: (state, action) => {
      state.filterValues = action.payload;
      state.variations = action.payload.variations.map(varia => ({ id: varia, name: varia }));
    },
    // Loading
    setLoadingProducts: (state, action) => {
      state.isLoadingProducts = action.payload;
    },
    setLoadingProduct: (state, action) => {
      state.isLoadingProduct = action.payload;
    },
    setLoadingFilterValues: (state, action) => {
      state.isLoadingFilterValues = action.payload;
    },
    // Is Success
    setSuccessProducts: (state, action) => {
      state.isSuccessProducts = action.payload;
    },
    setSuccessProduct: (state, action) => {
      state.isSuccessProduct = action.payload;
    },
    setSuccessFilterValues: (state, action) => {
      state.isSuccessFilterValues = action.payload;
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
export const selectFilterValues = {
  filterValues: state => state.products.filterValues,
  variations: state => state.products.variations,
  isLoadingFilterValues: state => state.products.isLoadingFilterValues,
  isSuccessFilterValues: state => state.products.isSuccessFilterValues
};

export default slice.reducer;
