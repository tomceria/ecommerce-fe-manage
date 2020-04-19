import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoadingCategories: false,
    isSuccessCategories: false,
    //
    category: {},
    isLoadingCategory: false,
    isSuccessCategory: false
  },
  reducers: {
    // Set Categories
    doGetCategories: (state, action) => {
      state.categories = action.payload.response.data.categories;
    },
    doGetCategory: (state, action) => {
      state.category = action.payload.response;
    },
    // Loading
    setLoadingCategories: (state, action) => {
      state.isLoadingCategories = action.payload;
    },
    setLoadingCategory: (state, action) => {
      state.isLoadingCategory = action.payload;
    },
    // Success
    setSuccessCategories: (state, action) => {
      state.isSuccessCategories = action.payload;
    },
    setSuccessCategory: (state, action) => {
      state.isSuccessCategory = action.payload;
    }
  }
});

// Selectors
export const selectCategories = {
  categories: state => state.categories.categories,
  isLoadingCategories: state => state.categories.isLoadingCategories,
  isSuccessCategories: state => state.categories.isSuccessCategories
};
export const selectCategory = {
  category: state => state.categories.category,
  isLoadingCategory: state => state.categories.isLoadingCategory,
  isSuccessCategory: state => state.categories.isSuccessCategory
};

export default slice.reducer;
