import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "scales",
  initialState: {
    scales: [],
    isLoadingScales: false,
    isSuccessScales: false,
    //
    scale: {},
    isLoadingScale: false,
    isSuccessScale: false
  },
  reducers: {
    // Set Scales
    doGetScales: (state, action) => {
      // state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.scales = data ? data.scales : [];
      // state.pagination = data ? data.pagination : {};
    },
    doGetScale: (state, action) => {
      state.scale = action.payload;
    },
    // Loading
    setLoadingScales: (state, action) => {
      state.isLoadingScales = action.payload;
    },
    setLoadingScale: (state, action) => {
      state.isLoadingScale = action.payload;
    },
    // Is Success
    setSuccessScales: (state, action) => {
      state.isSuccessScales = action.payload;
    },
    setSuccessScale: (state, action) => {
      state.isSuccessScale = action.payload;
    }
  }
});

// Selectors
// export const selectScalesFilters = state => state.scales.filters;
export const selectScales = {
  scales: state => state.scales.scales,
  // pagination: state => state.scales.pagination,
  isLoadingScales: state => state.scales.isLoadingScales,
  isSuccessScales: state => state.scales.isSuccessScales
};
export const selectScale = {
  scale: state => state.scales.scale,
  isLoadingScale: state => state.scales.isLoadingScale,
  isSuccessScale: state => state.scales.isSuccessScale
};

export default slice.reducer;
