import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "types",
  initialState: {
    types: [],
    isLoadingTypes: false,
    isSuccessTypes: false,
    //
    type: {},
    isLoadingType: false,
    isSuccessType: false
  },
  reducers: {
    // Set Types
    doGetTypes: (state, action) => {
      // state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.types = data ? data.types : [];
      // state.pagination = data ? data.pagination : {};
    },
    doGetType: (state, action) => {
      state.type = action.payload;
    },
    // Loading
    setLoadingTypes: (state, action) => {
      state.isLoadingTypes = action.payload;
    },
    setLoadingType: (state, action) => {
      state.isLoadingType = action.payload;
    },
    // Is Success
    setSuccessTypes: (state, action) => {
      state.isSuccessTypes = action.payload;
    },
    setSuccessType: (state, action) => {
      state.isSuccessType = action.payload;
    }
  }
});

// Selectors
// export const selectTypesFilters = state => state.types.filters;
export const selectTypes = {
  types: state => state.types.types,
  // pagination: state => state.types.pagination,
  isLoadingTypes: state => state.types.isLoadingTypes,
  isSuccessTypes: state => state.types.isSuccessTypes
};
export const selectType = {
  type: state => state.types.type,
  isLoadingType: state => state.types.isLoadingType,
  isSuccessType: state => state.types.isSuccessType
};

export default slice.reducer;
