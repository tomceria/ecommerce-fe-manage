import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "makers",
  initialState: {
    makers: [],
    isLoadingMakers: false,
    isSuccessMakers: false,
    //
    maker: {},
    isLoadingMaker: false,
    isSuccessMaker: false
  },
  reducers: {
    // Set Makers
    doGetMakers: (state, action) => {
      // state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.makers = data ? data.makers : [];
      // state.pagination = data ? data.pagination : {};
    },
    doGetMaker: (state, action) => {
      state.maker = action.payload;
    },
    // Loading
    setLoadingMakers: (state, action) => {
      state.isLoadingMakers = action.payload;
    },
    setLoadingMaker: (state, action) => {
      state.isLoadingMaker = action.payload;
    },
    // Success
    setSuccessMakers: (state, action) => {
      state.isSuccessMakers = action.payload;
    },
    setSuccessMaker: (state, action) => {
      state.isSuccessMaker = action.payload;
    }
  }
});

// Selectors
export const selectMakers = {
  makers: state => state.makers.makers,
  isLoadingMakers: state => state.makers.isLoadingMakers,
  isSuccessMakers: state => state.makers.isSuccessMakers
};
export const selectMaker = {
  maker: state => state.makers.maker,
  isLoadingMaker: state => state.makers.isLoadingMaker,
  isSuccessMaker: state => state.makers.isSuccessMaker
};

export default slice.reducer;
