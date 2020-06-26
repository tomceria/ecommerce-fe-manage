import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "supportTicketStatuses",
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
    supportTicketStatuses: [],
    // pagination: {},
    isLoadingSupportTicketStatuses: false,
    isSuccessSupportTicketStatuses: false
    //
  },
  reducers: {
    // Set SupportTicketStatuses
    doGetSupportTicketStatuses: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.supportTicketStatuses = data ? data.supportTicketStatuses : [];
      state.pagination = data ? data.pagination : {};
    },
    doGetSupportTicketStatus: (state, action) => {
      state.supportTicket = action.payload;
    },
    // Loading
    setLoadingSupportTicketStatuses: (state, action) => {
      state.isLoadingSupportTicketStatuses = action.payload;
    },
    setLoadingSupportTicketStatus: (state, action) => {
      state.isLoadingSupportTicketStatus = action.payload;
    },
    // Is Success
    setSuccessSupportTicketStatuses: (state, action) => {
      state.isSuccessSupportTicketStatuses = action.payload;
    },
    setSuccessSupportTicketStatus: (state, action) => {
      state.isSuccessSupportTicketStatus = action.payload;
    }
  }
});

// Selectors
export const selectSupportTicketStatusesFilters = state => state.supportTicketStatuses.filters;
export const selectSupportTicketStatuses = {
  supportTicketStatuses: state => state.supportTicketStatuses.supportTicketStatuses,
  // pagination: state => state.supportTicketStatuses.pagination,
  isLoadingSupportTicketStatuses: state =>
    state.supportTicketStatuses.isLoadingSupportTicketStatuses,
  isSuccessSupportTicketStatuses: state =>
    state.supportTicketStatuses.isSuccessSupportTicketStatuses
};

export default slice.reducer;
