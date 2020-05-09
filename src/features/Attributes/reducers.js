import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "attributes",
  initialState: {
    attributes: [],
    isLoadingAttributes: false,
    isSuccessAttributes: false,
    //
    attribute: {},
    isLoadingAttribute: false,
    isSuccessAttribute: false
  },
  reducers: {
    // Set Attributes
    doGetAttributes: (state, action) => {
      // state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.attributes = data ? data.attributes : [];
      // state.pagination = data ? data.pagination : {};
    },
    doGetAttribute: (state, action) => {
      state.attribute = action.payload;
    },
    // Loading
    setLoadingAttributes: (state, action) => {
      state.isLoadingAttributes = action.payload;
    },
    setLoadingAttribute: (state, action) => {
      state.isLoadingAttribute = action.payload;
    },
    // Success
    setSuccessAttributes: (state, action) => {
      state.isSuccessAttributes = action.payload;
    },
    setSuccessAttribute: (state, action) => {
      state.isSuccessAttribute = action.payload;
    }
  }
});

// Selectors
export const selectAttributes = {
  attributes: state => state.attributes.attributes,
  isLoadingAttributes: state => state.attributes.isLoadingAttributes,
  isSuccessAttributes: state => state.attributes.isSuccessAttributes
};
export const selectAttribute = {
  attribute: state => state.attributes.attribute,
  isLoadingAttribute: state => state.attributes.isLoadingAttribute,
  isSuccessAttribute: state => state.attributes.isSuccessAttribute
};

export default slice.reducer;
