import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "accountStaff",
  initialState: {
    filters: {
      query: "",
      page: 1,
      size: 25,
      roleId: "",
      locked: "",
      sort: "createdAt",
      sortDesc: false
    },
    //
    accounts: [],
    pagination: {},
    isLoadingAccountStaffs: false,
    isSuccessAccountStaffs: false,
    //
    account: {},
    isLoadingAccountStaff: false,
    isSuccessAccountStaff: false,
    //
    roles: [],
    isLoadingStaffRoles: false,
    isSuccessStaffRoles: false
  },
  reducers: {
    // Set AccountStaffs
    doGetAccountStaffs: (state, action) => {
      state.filters = { ...state.filters, ...action.payload.filters };
      const { data } = action.payload.response;
      state.accounts = data ? data.accounts : [];
      state.pagination = data ? data.pagination : {};
    },
    doGetAccountStaff: (state, action) => {
      state.account = action.payload.response;
    },
    // Set Staff Roles
    doGetStaffRoles: (state, action) => {
      const { data } = action.payload.response;
      state.roles = data ? data.roles : [];
    },
    // Loading
    setLoadingAccountStaffs: (state, action) => {
      state.isLoadingAccountStaffs = action.payload;
    },
    setLoadingAccountStaff: (state, action) => {
      state.isLoadingAccountStaff = action.payload;
    },
    setLoadingStaffRoles: (state, action) => {
      state.isLoadingStaffRoles = action.payload;
    },
    // Is Success
    setSuccessAccountStaffs: (state, action) => {
      state.isSuccessAccountStaffs = action.payload;
    },
    setSuccessAccountStaff: (state, action) => {
      state.isSuccessAccountStaff = action.payload;
    },
    setSuccessStaffRoles: (state, action) => {
      state.isSuccessStaffRoles = action.payload;
    }
  }
});

// Selectors
export const selectAccountStaffsFilters = state => state.accountStaff.filters;
export const selectAccountStaffs = {
  accountStaffs: state => state.accountStaff.accounts,
  pagination: state => state.accountStaff.pagination,
  isLoadingAccountStaffs: state => state.accountStaff.isLoadingAccountStaffs,
  isSuccessAccountStaffs: state => state.accountStaff.isSuccessAccountStaffs
};
export const selectAccountStaff = {
  accountStaff: state => state.accountStaff.account,
  isLoadingAccountStaff: state => state.accountStaff.isLoadingAccountStaff,
  isSuccessAccountStaff: state => state.accountStaff.isSuccessAccountStaff
};
export const selectStaffRoles = {
  roles: state => state.accountStaff.roles,
  isLoadingStaffRoles: state => state.accountStaff.isLoadingStaffRoles,
  isSuccessStaffRoles: state => state.accountStaff.isSuccessStaffRoles
};

export default slice.reducer;
