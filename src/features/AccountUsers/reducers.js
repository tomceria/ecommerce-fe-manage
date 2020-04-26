import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "accountUsers",
  initialState: {
    filters: {
      query: "",
      page: 1,
      size: 25,
      locked: "",
      sort: "createdAt",
      sortDesc: false
    },
    //
    accounts: [],
    pagination: {},
    isLoadingAccountUsers: false,
    isSuccessAccountUsers: false,
    //
    account: {},
    isLoadingAccountUser: false,
    isSuccessAccountUser: false,
  },
  reducers: {
    // Set AccountUsers
    doGetAccountUsers: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.accounts = data ? data.accounts : [];
      state.pagination = data ? data.pagination : {};
    },
    doGetAccountUser: (state, action) => {
      state.account = action.payload.response;
    },
    // Loading
    setLoadingAccountUsers: (state, action) => {
      state.isLoadingAccountUsers = action.payload;
    },
    setLoadingAccountUser: (state, action) => {
      state.isLoadingAccountUser = action.payload;
    },
    // Is Success
    setSuccessAccountUsers: (state, action) => {
      state.isSuccessAccountUsers = action.payload;
    },
    setSuccessAccountUser: (state, action) => {
      state.isSuccessAccountUser = action.payload;
    }
  }
});

// Selectors
export const selectAccountUsersFilters = state => state.accountUsers.filters;
export const selectAccountUsers = {
  accountUsers: state => state.accountUsers.accounts,
  pagination: state => state.accountUsers.pagination,
  isLoadingAccountUsers: state => state.accountUsers.isLoadingAccountUsers,
  isSuccessAccountUsers: state => state.accountUsers.isSuccessAccountUsers
};
export const selectAccountUser = {
  accountUser: state => state.accountUsers.account,
  isLoadingAccountUser: state => state.accountUsers.isLoadingAccountUser,
  isSuccessAccountUser: state => state.accountUsers.isSuccessAccountUser
};

export default slice.reducer;
