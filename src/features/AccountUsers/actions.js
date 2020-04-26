import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetAccountUsers,
  doGetAccountUser,
  setLoadingAccountUsers,
  setLoadingAccountUser,
  setSuccessAccountUsers,
  setSuccessAccountUser
} = slice.actions;

export const performGetAccountUsers = createAction(
  "ACCOUNTUSER_SAGA_GETACCOUNTUSERS",
  function prepare(filters) {
    return {
      payload: { ...filters }
    };
  }
);

export const performGetAccountUser = createAction(
  "ACCOUNTUSER_SAGA_GETACCOUNTUSER",
  function prepare(id) {
    return { payload: id };
  }
);
