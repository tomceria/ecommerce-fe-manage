import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "supportTickets",
  initialState: {
    filters: {
      query: "",
      page: 1,
      size: 25,
      supportTypeId: "",
      support: "",
      customer: "",
      statusId: "",
      sort: "timeStart",
      sortDesc: true
    },
    //
    supportTickets: [],
    pagination: {},
    isLoadingSupportTickets: false,
    isSuccessSupportTickets: false,
    //
    supportTicket: {},
    isLoadingSupportTicket: false,
    isSuccessSupportTicket: false
  },
  reducers: {
    // Set SupportTickets
    doGetSupportTickets: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.supportTickets = data ? data.supportTickets : [];
      state.pagination = data ? data.pagination : {};
    },
    doGetSupportTicket: (state, action) => {
      state.supportTicket = action.payload;
    },
    // Loading
    setLoadingSupportTickets: (state, action) => {
      state.isLoadingSupportTickets = action.payload;
    },
    setLoadingSupportTicket: (state, action) => {
      state.isLoadingSupportTicket = action.payload;
    },
    // Success
    setSuccessSupportTickets: (state, action) => {
      state.isSuccessSupportTickets = action.payload;
    },
    setSuccessSupportTicket: (state, action) => {
      state.isSuccessSupportTicket = action.payload;
    }
  }
});

// Selectors
export const selectSupportTicketsFilters = state => state.supportTickets.filters;
export const selectSupportTickets = {
  supportTickets: state => state.supportTickets.supportTickets,
  pagination: state => state.supportTickets.pagination,
  isLoadingSupportTickets: state => state.supportTickets.isLoadingSupportTickets,
  isSuccessSupportTickets: state => state.supportTickets.isSuccessSupportTickets
};
export const selectSupportTicket = {
  supportTicket: state => state.supportTickets.supportTicket,
  isLoadingSupportTicket: state => state.supportTickets.isLoadingSupportTicket,
  isSuccessSupportTicket: state => state.supportTickets.isSuccessSupportTicket
};

export default slice.reducer;
