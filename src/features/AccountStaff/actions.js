import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetAccountStaffs,
  doGetAccountStaff,
  doGetStaffRoles,
  setLoadingAccountStaffs,
  setLoadingAccountStaff,
  setLoadingStaffRoles,
  setSuccessAccountStaffs,
  setSuccessAccountStaff,
  setSuccessStaffRoles
} = slice.actions;

export const performGetAccountStaffs = createAction(
  "ACCOUNTSTAFF_SAGA_GETACCOUNTSTAFFS",
  function prepare(filters) {
    return {
      payload: { ...filters }
    };
  }
);

export const performGetAccountStaff = createAction(
  "ACCOUNTSTAFF_SAGA_GETACCOUNTSTAFF",
  function prepare(id) {
    return { payload: id };
  }
);

export const performGetStaffRoles = createAction("ACCOUNTSTAFF_SAGA_GETSTAFFROLES");
