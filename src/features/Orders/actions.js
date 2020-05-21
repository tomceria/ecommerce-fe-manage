import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetOrders,
  doGetOrder,
  setLoadingOrders,
  setLoadingOrder,
  setSuccessOrders,
  setSuccessOrder
} = slice.actions;

export const performGetOrders = createAction("ORDERS_SAGA_GETORDERS", function prepare(filters) {
  return {
    payload: { ...filters }
  };
});
export const performGetOrder = createAction("ORDERS_SAGA_GETORDER", function prepare(id) {
  return { payload: id };
});
