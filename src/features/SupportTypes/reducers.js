import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "supportTypes",
  initialState: {
    // filters: {
    // query: "",
    // page: 1,
    // size: 25,
    // userId: "",
    // verifier: "",
    // sort: "createdAt",
    // sortDesc: true
    // },
    //
    supportTypes: [],
    // pagination: {},
    isLoadingSupportTypes: false,
    isSuccessSupportTypes: false
    //
  },
  reducers: {
    // Set SupportTypes
    doGetSupportTypes: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.supportTypes = data ? data.supportTypes : [];
      state.pagination = data ? data.pagination : {};
    },
    doGetSupportTicketStatus: (state, action) => {
      state.supportTicket = action.payload;
    },
    // Loading
    setLoadingSupportTypes: (state, action) => {
      state.isLoadingSupportTypes = action.payload;
    },
    setLoadingSupportTicketStatus: (state, action) => {
      state.isLoadingSupportTicketStatus = action.payload;
    },
    // Is Success
    setSuccessSupportTypes: (state, action) => {
      state.isSuccessSupportTypes = action.payload;
    },
    setSuccessSupportTicketStatus: (state, action) => {
      state.isSuccessSupportTicketStatus = action.payload;
    }
  }
});

// Selectors
export const selectSupportTypesFilters = state => state.supportTypes.filters;
export const selectSupportTypes = {
  supportTypes: state => state.supportTypes.supportTypes,
  // pagination: state => state.supportTypes.pagination,
  isLoadingSupportTypes: state => state.supportTypes.isLoadingSupportTypes,
  isSuccessSupportTypes: state => state.supportTypes.isSuccessSupportTypes
};

export default slice.reducer;
