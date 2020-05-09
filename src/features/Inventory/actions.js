import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetInventoryItems,
  doGetInventoryItem,
  setLoadingInventoryItems,
  setLoadingInventoryItem,
  setSuccessInventoryItems,
  setSuccessInventoryItem
} = slice.actions;

export const performGetInventoryItems = createAction(
  "INVENTORY_SAGA_GETINVENTORYITEMS",
  function prepare(filters) {
    return {
      payload: { ...filters }
    };
  }
);
export const performGetInventoryItem = createAction(
  "INVENTORY_SAGA_GETINVENTORYITEM",
  function prepare(id) {
    return { payload: id };
  }
);
