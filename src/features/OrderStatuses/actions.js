import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetOrderStatuses,
  setLoadingOrderStatuses,
  setSuccessOrderStatuses
} = slice.actions;

export const performGetOrderStatuses = createAction(
  "ORDERSTATUSES_SAGA_GETORDERSTATUSES",
  function prepare(filters) {
    return {
      payload: { ...filters }
    };
  }
);
